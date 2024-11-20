const { DataTypes } = require('sequelize')
const sequelize = require('../db/sequelize')

const Article = sequelize.define('Article', {
    slug:{
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING, 
        allowNull: false
    },
    body: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT
    }
})

module.exports = Article;