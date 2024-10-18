const { decode } = require('../../utils/jwt');
const HttpException = require('../../exceptions/http.exceptions');

module.exports.authMiddleware = async (req, res, next) => {
    console.log(req.headers.authorization);

    const authHeader = req.headers.authorization;
    if(!authHeader)
        return new HttpException(401, 'missing authorization', 'missing authorization');
    const authArr = authHeader.split(' ');
    if(authArr[0]!='Token')
        return new HttpException(401, 'missing token', 'missing token');
    if(!authArr[1])
        return new HttpException(401, 'missing token content', 'missing token content');
    try {
        const user = await decode(authArr[1]);
        req.user = user;
        console.log("from auth user:", user);
        req.token = authArr[1];
        return next();
    } catch (error) {
        return new HttpException(401, 'token authorization failed', error.message);
    }

}
