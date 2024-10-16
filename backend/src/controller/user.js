const HttpException = require("../exceptions/http.exceptions");
const { validateCreateUser } = require("../utils/validate/user.validate");
const User = require('../model/user');
const { md5Password } = require("../utils/md5");

module.exports.createUser = async (req, res) => {
    // res.json({
    //     status: 200,
    //     message: "success",
    //     data: {
    //         code:1,
    //         message: "user succssfully added!",
    //         data:{}
    //     }
    // })
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
            data.token = null;
            // TODO: implement token logic
            data.avatar = null;
            data.bio = null;
            res.json({
                status: 200,
                message: "success",
                data: {
                    code: 1,
                    message: "user succssfully added!",
                    data: {}
                }
            })
        }
    } catch (error) {


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