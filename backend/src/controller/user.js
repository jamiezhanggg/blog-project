const HttpException = require("../exceptions/http.exceptions");
const { validateCreateUser, validateUserLogin } = require("../utils/validate/user.validate");
const User = require('../model/user');
const { md5Password, matchPassword } = require("../utils/md5");
const { sign, decode } = require('../utils/jwt');

module.exports.createUser = async (req, res) => {
    try {
        let { username, password, email } = req.body.user;
        let { error, validate } = validateCreateUser(username, password, email);
        if (!validate)
            throw new HttpException(400, 'validation error', error);
        const existUser = await User.findByPk(email);
        if (existUser) throw HttpException(400, 'email already exists', 'email already exists');
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

module.exports.login = async (req, res) => {
    try{

        let {email, password} = req.body.user;
        let {error, validate} = user.validateUserLogin(email, password);
        if(!validate)
            throw new HttpException(400, 'validation error', error);
        let user = await User.findByPk(email);
        if(!user) {
            throw new HttpException(401, 'user donnot exist', 'user donnot exist');
        }
        const encryptedPassword = await md5Password(password);
        const match = await matchPassword(encryptedPassword, password);
        if(!match) {
            throw new HttpException(401, 'wrong password', 'wrong password');
        }
        delete user.dataValues.password;
        user.dataValues.token = await sign(
            user.dataValues.username,
            user.dataValues.password
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

module.exports.getUser = async (req, res) => {
    res.json({
        status: 200,
        message: "success",
        data: {
            code: 1,
            message: "getting user request succeed!",
            data: {
                name: "Jamie",
                age: 23
            }
        }
    })
}