const Tag = require('../model/tag');
const HttpException = require('../exceptions/http.exceptions');

// get all tags
module.exports.getTags = async (req, res, next) => {
    try{
        const tags = await Tag.findAll();
        const taglist = [];
        if(tags) {
            tags.forEach(element => {
                taglist.push(element.dataValues.name);
            });
        }
        console.log(taglist);
        res.status(200).json({
            status:1,
            message:'get tags succeed',
            data: taglist
        })
    } catch(error) {
        next(error);
    }
}

// create tag
module.exports.createTag = async (req, res, next) => {
    try{
        const name = req.body.tag;
        const newTag = await Tag.create({name});
        res.status(200).json({
            status:1,
            message: 'create tag succeed',
            data: newTag.dataValues
        })
    } catch(error) {
        next(error);
    }
}