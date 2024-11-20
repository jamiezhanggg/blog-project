const validator = require('validator');
module.exports.validateCreateArticle = (title, article, description) => {
    let error = {};
    if(validator.isEmpty(title)){
        error.title = 'title cannot be empty';
    }
    if(validator.isEmpty(article)){
        error.article = 'article cannot be empty';
    }
    if(validator.isEmpty(description)){
        error.description = 'description cannot be empty';
    }
    let validate = Object.keys(error).length==0? true: false;
    return {error, validate};
}