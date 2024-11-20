const userRoute = require('../routes/user');
const followRoute = require('../routes/follow');
const tagRoute = require('../routes/tag');
const articleRoute = require('../routes/article');

const initRoute = (app) => {
    app.use('/api/v1/user', userRoute);
    app.use('/api/v1/follow', followRoute);
    app.use('/api/v1/tag', tagRoute);
    app.use('/api/v1/article', articleRoute);
};

module.exports = initRoute;
