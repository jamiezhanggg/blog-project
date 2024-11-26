const HttpException = require("../exceptions/http.exceptions");
const Article = require("../model/article");
const Tag = require("../model/tag");

function handleArticle(article, author, count) {
    const tagList = [];
    for (const t of article.dataValues.Tags) {
        tagList.push(t.dataValues.name);
    }
    article.dataValues.Tags = tagList;
    delete article.dataValues.User;
    delete author.dataValues.email;
    delete author.dataValues.password;
    article.dataValues.author = author.dataValues;
    article.dataValues.favoriteCount = count;
    return article.dataValues;
}


module.exports.addFavorite = async (req, res, next) => {
    try {
        const userEmail = req.user.email;
        const { slug } = req.params;
        let article = await Article.findByPk(slug, { include: Tag });
        if (!article)
            throw new HttpException(404, 'article not found', 'article not found');
        await article.addUsers(userEmail);
        const author = await article.getUser();
        const count = await article.countUsers();
        article = handleArticle(article, author, count);
        res.status(200).json({
            status: 1,
            message: 'article favorite succeed',
            data: article
        })
    }
    catch (e) {
        next(e);
    }
}

module.exports.removeFavorite = async (req, res, next) => {
    try {
        const userEmail = req.user.email;
        const { slug } = req.params;
        let article = await Article.findByPk(slug, { include: Tag });
        if (!article)
            throw new HttpException(404, 'article not found', 'article not found');
        await article.removeUsers(userEmail);
        const author = await article.getUser();
        const count = await article.countUsers();
        article = handleArticle(article, author, count);
        res.status(200).json({
            status: 1,
            message: 'article unfavorite succeed',
            data: article
        })
    }
    catch (e) {
        next(e);
    }
}