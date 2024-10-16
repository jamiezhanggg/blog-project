require('dotenv').config('../../.env'); 
const jwt = require('jsonwebtoken');

const sign = async (username, email) => {
    return new Promise((resolve, reject) => {
        jwt.sign({
            username, 
            email
        }, process.env.JWT_SECRET, (err, token) => {
            if(err) {
                console.log(err);
                return reject(err);
            }
            resolve(token);
        })
    })
}

const decode = async (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET,
            (err, decoded) => {
                if(err){
                    console.log(err);
                    return reject(err);
                }
                return resolve(decoded);
            }
        );
    })
}

module.exports = {sign, decode};