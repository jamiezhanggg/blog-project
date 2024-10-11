const { DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize');
const User = sequelize.define('User', {
    email: {
        type: DataTypes.STRING, 
        allowNull: false,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    avatar:{
        type: DataTypes.TEXT
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false
    },
    bio: {
        type: DataTypes.TEXT
    }
})

module.exports = User;