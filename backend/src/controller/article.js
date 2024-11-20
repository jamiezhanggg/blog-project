const HttpException = require('../exceptions/http.exceptions');
const User = require('../model/user');
const { getSlug } = require('../utils/slug');
const { validateCreateArticle } = require('../utils/validate/article.validate')
const Article = require('../model/article');
const Tag = require('../model/tag');

module.exports.createArticle = async(req, res, next) => {
    try{
        const { title, body, description, tags } = req.body.article;
        const {error, validate} = validateCreateArticle(title, body, description);
        if(!validate) {
            throw new HttpException(400, 'validation error', error);
        }
        const email = req.user.email;
        const author = await User.findByPk(email);
        if(!author) {
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

        if(tags) {
            for(const t of tags) {
                const existTag = await Tag.findByPk(t);
                if(!existTag) {
                    let newTag = await Tag.create({name: t});
                    await article.addTag(newTag);
                } else await article.addTag(existTag);
            }
        }
        article = await Article.findByPk(slug, {include: Tag});
        const tagList = [];
        for (const t of article.dataValues.Tags){
            tagList.push(t.dataValues.name);
        }
        article.dataValues.Tags = tagList;
        delete author.dataValues.email;
        delete author.dataValues.password;
        article.dataValues.author = author;

        res.status(200).json({
            status:1,
            message: 'create article succeed',
            data: article.dataValues
        })
    } catch(error) {
        next(error);
    }
}