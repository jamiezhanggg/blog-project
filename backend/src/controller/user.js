const HttpException = require("../exceptions/http.exceptions");
const { validateCreateUser, validateUserLogin } = require("../utils/validate/user.validate");
const User = require('../model/user');
const { md5Password, matchPassword } = require("../utils/md5");
const { sign, decode } = require('../utils/jwt');

module.exports.createUser = async (req, res, next) => {
    try {
        let { username, password, email } = req.body.user;
        let { error, validate } = validateCreateUser(username, password, email);
        if (!validate)
            throw new HttpException(400, 'validation error', error);
        const existUser = await User.findByPk(email);
        if (existUser) throw new HttpException(400, 'email already exists', 'email already exists');
        const pwd = await md5Password(password);
        const user = User.create({
            username,
            password: pwd,
            email
        })
        if (user) {
            console.log(user);
            let data = {};
            data.username = username;
            data.email = email;
            data.token = await sign(username, email);
            data.avatar = null;
            data.bio = null;
            res.json({
                status: 201,
                message: "success",
                data: {
                    code: 1,
                    message: "user succssfully added!",
                    data: {}
                }
            })
        }
    } catch (error) {
        next(error);
    }
}

module.exports.login = async (req, res, next) => {
    try{

        let {email, password} = req.body.user;
        let {error, validate} = validateUserLogin(email, password);
        if(!validate)
            throw new HttpException(400, 'validation error', error);
        let user = await User.findByPk(email);
        if(!user) {
            throw new HttpException(401, 'user donnot exist', 'user donnot exist');
        }
        const match = await matchPassword(user.dataValues.password, password);
        if(!match) {
            throw new HttpException(401, 'wrong password', 'wrong password');
        }
        delete user.dataValues.password;
        user.dataValues.token = await sign(
            user.dataValues.username,
            user.dataValues.email
        );
        return res.status(200).json({
            status: 1,
            data: user, 
            message: 'login succeed'
        })
    } catch (err) {
        next(err);
    }
}

module.exports.getUser = async (req, res, next) => {
    try {
        const {email} = req.user;
        const user = await User.findByPk(email);
        if(!user)
            throw new HttpException(401, 'user not found', 'user not found');
        delete user.dataValues.password;
        // user.dataValues.token = user.token;
        return res.status(200).json({
            status: 1,
            message: 'get user request succeed',
            data: user.dataValues
        })
    } catch (error) {
        next(error);
    }
}

module.exports.updateUser = async (req, res, next) => {
    try{
        const {email} = req.user;
        const user = await User.findByPk(email);
        if(!user)
            throw new HttpException(401, 'user not found', 'user not found');
        delete user.dataValues.password;
        let updatedUser = req.body.user;
        let encryptedPassword = null;
        for (const key of Object.keys(updatedUser)) {
            if(key=='password') {
                encryptedPassword = await md5Password(updatedUser.password);
            }
        }
        if(encryptedPassword){
            updatedUser.password = encryptedPassword;
        }
        delete updatedUser.email;
        await user.update(updatedUser);
        delete user.dataValues.password;
        return res.status(200).json({
            status:1,
            message: "user updated successfully",
            data:user.dataValues
        })
    } catch (error) {
        next(error);
    }
}