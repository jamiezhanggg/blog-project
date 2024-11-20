const uniqueSlug = require('unique-slug');

module.exports.getSlug = ()=>{
    return uniqueSlug();
}