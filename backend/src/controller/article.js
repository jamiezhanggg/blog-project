const HttpException = require('../exceptions/http.exceptions');
const User = require('../model/user');
const { getSlug } = require('../utils/slug');
const { validateCreateArticle } = require('../utils/validate/article.validate')
const Article = require('../model/article');
const Tag = require('../model/tag');
const sequelize = require('../db/sequelize');
const { canTreatArrayAsAnd } = require('sequelize/lib/utils');

function handleArticle(article, author) {
    const tagList = [];
    for (const t of article.dataValues.Tags) {
        tagList.push(t.dataValues.name);
    }
    article.dataValues.Tags = tagList;
    delete article.dataValues.User;
    delete author.dataValues.email;
    delete author.dataValues.password;
    article.dataValues.author = author.dataValues;
    return article.dataValues;
}

module.exports.createArticle = async (req, res, next) => {
    try {
        const { title, body, description, tags } = req.body.article;
        const { error, validate } = validateCreateArticle(title, body, description);
        if (!validate) {
            throw new HttpException(400, 'validation error', error);
        }
        const email = req.user.email;
        const author = await User.findByPk(email);
        if (!author) {
            throw new HttpException(401, 'author do not exist', 'author do not exist');
        }
        let slug = getSlug();

        let article = await Article.create({
            slug,
            title,
            description,
            body,
            UserEmail: author.email
        })

        if (tags) {
            for (const t of tags) {
                const existTag = await Tag.findByPk(t);
                if (!existTag) {
                    let newTag = await Tag.create({ name: t });
                    await article.addTag(newTag);
                } else await article.addTag(existTag);
            }
        }
        article = await Article.findByPk(slug, { include: Tag });
        article = handleArticle(article, author);
        res.status(200).json({
            status: 1,
            message: 'create article succeed',
            data: article
        })
    } catch (error) {
        next(error);
    }
}

module.exports.getArticle = async (req, res, next) => {
    try {
        const slug = req.params.slug;
        let article = await Article.findByPk(slug, { include: Tag });
        const email = article.dataValues.UserEmail;
        const author = await User.findByPk(email);
        article = handleArticle(article, author);
        res.status(200).json({
            status: 1,
            message: 'got article from slug',
            data: article
        })
    } catch (e) {
        next(e);
    }
}

module.exports.updateArticle = async (req, res, next) => {
    try {
        const slug = req.params.slug;
        let article = await Article.findByPk(slug, { include: Tag });
        if (!article)
            throw new HttpException(400, 'error', "article not found");
        const authEmail = article.dataValues.UserEmail;
        const loginEmail = req.user.email;
        if (authEmail !== loginEmail)
            throw new HttpException(400, 'error', "cannot update without logging in");
        const user = await User.findByPk(authEmail);
        if (!user)
            throw new HttpException(403, 'error', "user not found");
        let { title, description, body } = req.body.article;
        data = article.dataValues;
        title = title ? title : data.title;
        description = description ? description : data.description;
        body = body ? body : data.body;
        await article.update({ title, description, body });
        article = handleArticle(article, user);
        res.status(200).json({
            status: 1,
            message: 'update article succeed',
            data: article
        })
    } catch (e) {
        next(e);
    }
}

module.exports.deleteArticle = async (req, res, next) => {
    try {
        const slug = req.params.slug;
        let article = await Article.findByPk(slug, { include: Tag });
        if (!article)
            throw new HttpException(400, 'err', "article not foumd error");
        const userEmail = req.user.email;
        const author = article.dataValues.UserEmail;
        if (author !== userEmail)
            new HttpException(400, 'error', "cannot delete without logging in");
        await Article.destroy({ where: { slug } });
        res.status(200).json({
            status: 1,
            message: 'delete article succeed',
        })
    } catch (e) {
        next(e);
    }
}

module.exports.getFollowingArticle = async (req, res, next) => {
    try {
        const followerEmail = req.user.email;
        const q = `SELECT DISTINCT userEmail from followers where followerEmail ="${followerEmail}"`;
        let followingEmail = await sequelize.query(q);
        followingEmail = followingEmail[0];
        const followingEmails = followingEmail.map(user => user.userEmail);
        let allArticles = await Article.findAll({
            where: {
                userEmail: followingEmails
            }, include: [Tag, User]
        })
        let results = [];
        for (let article of allArticles) {
            article = handleArticle(article, article.dataValues.User);
            results.push(article);
        }
        res.status(200).json({
            status: 1,
            message: 'retreive articles succeed',
            data: results
        })
    } catch (e) {
        next(e);
    }
}

module.exports.getArticles = async (req, res, next) => {
    try {
        const { tag, author, limit = 5, offset = 0 } = req.query;
        let allArticles = [];
        if (tag && !author) {
            allArticles = await Article.findAll({
                include: [
                    {
                        model: Tag,
                        attributes: ['name'],
                        where: {
                            name: tag
                        },
                    },
                ], limit: parseInt(limit), offset: parseInt(offset)
            })

        } else if (!tag && author) {
            allArticles = await Article.findAll({
                include: [{
                    model: User,
                    where: { username: author }
                }, Tag], limit: parseInt(limit), offset: parseInt(offset)
            })
        }
        else if (tag && author) {
            allArticles = await Article.findAll({
                include: [
                    {
                        model: User,
                        where: { username: author }
                    },
                    {
                        model: Tag,
                        attributes: ['name'],
                        where: {
                            name: tag
                        },
                    },
                ], limit: parseInt(limit), offset: parseInt(offset)
            })
        } else {
            allArticles = await Article.findAll({
                include: Tag, limit: parseInt(limit), offset: parseInt(offset)
            })
        }
        let results = []
        for (let article of allArticles) {
            let auth = await User.findByPk(article.dataValues.UserEmail);
            article = handleArticle(article, auth);
            results.push(article);
        }
        res.status(200).json({
            status: 1,
            message: 'retreive articles succeed',
            data: results
        })
    } catch (e) {
        next(e);
    }
}