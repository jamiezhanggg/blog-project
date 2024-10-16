const validator = require('validator');
module.exports.validateCreateUser = (username, password, email) => {
    let error = {};
    if(validator.isEmpty(username)) {
        error.username = 'username cannot be empty';
    }
    if(validator.isEmpty(password)) {
        error.password = 'password cannot be empty';
    }
    if(validator.isEmpty(email)) {
        error.email = 'email cannot be empty';
    }
    if(!validator.isEmpty(email) && !validator.isEmail(email)) {
        error.email = 'email not legal';
    }

    let validate = Object.keys(error).length<1? true:false;
    return {error, validate};
}

module.exports.validateUserLogin = (email, password) => {
    let error = {};
    if(validator.isEmpty(email))
        error.email = 'email cannot be empty';
    if(validator.isEmpty(password))
        error.password = 'password cannot be empty';
    if(!validator.isEmpty(email) && !validator.isEmail(email))
        error.email = 'email not legal';
    let validate = Object.keys(error).length==0 ? true:false;
    return { error, validate };
}