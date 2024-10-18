const dbConnection = require('../db/connection');
const User = require('../model/user');
const Article = require('../model/article');
const Tag = require('../model/tag');
const Comment = require('../model/comment');
const sequelize = require('../db/sequelize');


const initRelation = () => {
    User.hasMany(Article, {
        onDelete: "CASCADE"
    })
    Article.belongsTo(User);

    Article.belongsToMany(Tag, {
        through: "TagList", 
        uniqueKey: false,
        timestamps: false
    })
    Tag.belongsToMany(Article, {
        through: "TagList",
        uniqueKey: false,
        timestamps: false
    })

    Article.hasMany(Comment, {
        onDelete: "CASCADE"
    })
    Comment.belongsTo(Article)

    User.hasMany(Comment, {
        onDelete: "CASCADE"
    });
    Comment.belongsTo(User);

    // following...
    User.belongsToMany(User, {
        through: "Followers",
        as: "followers",
        timestamps: false
    })

    // like
    User.belongsToMany(Article, {
        through: "Favorites",
        timestamps: false
    })

    Article.belongsToMany(User, {
        through: "Favorites",
        timestamps: false
    })

}

const initDB = ()=>{
    return new Promise(async (resolve, reject) => {
        try{
            await dbConnection();
            // init relation
            initRelation();
            await sequelize.sync();
            resolve();
        } catch (error) {
            console.log(error);
            reject(error);
        }
    })
};

module.exports = initDB;