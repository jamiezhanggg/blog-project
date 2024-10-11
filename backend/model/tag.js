const { DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize');

const Tag = sequelize.define('Tag', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    }
},
    {
        timestamps: false
    }
)

module.exports = Tag;
