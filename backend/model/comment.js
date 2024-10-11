const { DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize');

const Comment = sequelize.define('Comment', {
    body: {
        type: DataTypes.TEXT,
        allowNull: false
    }
})

module.exports = Comment;