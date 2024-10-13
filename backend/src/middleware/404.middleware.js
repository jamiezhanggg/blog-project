const HttpException = require('../exceptions/http.exceptions');
const noMatchMiddleware = (req, res, next) => {
    const noMatchError = new HttpException(404, 'url not found', 'url not found');
    next(noMatchError);
}
module.exports = noMatchMiddleware;