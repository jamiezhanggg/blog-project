const md5 = require('md5');
const salt = "SALT";

const md5Password = (password) => {
    return new Promise((resolve, reject) => {
        const md5Pwd = md5(password + salt);
        resolve(md5Pwd);
    })
}

const matchPassword = (savedPassword, usrPassword) => {
    return new Promise((resolve, reject) => {
        const md5Pwd = md5(usrPassword + salt);
        let match = md5Pwd == savedPassword ? true:false;
        if(match)
            resolve(true);
        reject(false);
    })
}
module.exports = {md5Password, matchPassword};