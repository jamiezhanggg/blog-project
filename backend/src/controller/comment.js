const HttpException = require("../exceptions/http.exceptions");
const Article = require("../model/article");
const Comment = require("../model/comment");
const User = require("../model/user");

module.exports.createComment = async (req, res, next) => {
    try {
        const { slug } = req.params;
        const { body } = req.body.comment;
        const article = await Article.findByPk(slug);
        const user = await User.findByPk(req.user.email);
        if (!article)
            throw new HttpException(404, 'article not found', 'article not found');
        let comment = await Comment.create({ body });
        comment.dataValues.user = {
            username: user.dataValues.username,
            bio: user.dataValues.bio,
            avatar: user.dataValues.avatar
        }

        await article.addComment(comment);
        await user.addComment(comment);

        res.status(200).json({
            status: 1,
            message: 'create comment succeed',
            data: comment.dataValues
        });
    }
    catch (e) {
        next(e);
    }
}

module.exports.getComments = async (req, res, next) => {
    try {
        const { slug } = req.params;
        const article = await Article.findByPk(slug);
        if (!article)
            throw new HttpException(404, 'article not found', 'article not found');
        const comments = await Comment.findAll({
            where: {
                articleSlug: slug
            },

        })
        let results = [];
        for (let comment of comments) {
            const user = await User.findByPk(comment.dataValues.UserEmail);
            comment.dataValues.user = {
                username : user.dataValues.username,
                bio : user.dataValues.bio,
                avatar : user.dataValues.avatar,
            }
            results.push(comment);
        }
        res.status(200).json({
            status: 1,
            message: 'get comments succeed',
            data: results
        })

    }
    catch (e) {
        next(e);
    }
}


module.exports.removeComment = async (req, res, next) => {
    try {
        const { slug, id } = req.params;
        const article = await Article.findByPk(slug);
        const comment = await Comment.findByPk(id);
        if (!article)
            throw new HttpException(404, 'article not found', 'article not found');
        if (!comment||comment.dataValues.ArticleSlug!==slug)
            throw new HttpException(404, 'comment not found', 'comment not found');
        if(comment.dataValues.UserEmail!==req.user.email&&comment.dataValues.UserEmail!==article.dataValues.UserEmail)
            throw new HttpException(403, 'cannot delete without authorization', 'cannot delete without authorization');
        await Comment.destroy({where:{id}});
        res.status(200).json({
            status: 1,
            message: 'delete comment succeed',
        })
    }
    catch (e) {
        next(e);
    }
}