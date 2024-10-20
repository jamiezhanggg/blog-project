const userRoute = require('../routes/user');
const followRoute = require('../routes/follow');
const tagRoute = require('../routes/tag');

const initRoute = (app) => {
    app.use('/api/v1/user', userRoute);
    app.use('/api/v1/follow', followRoute);
    app.use('/api/v1/tag', tagRoute);
};

module.exports = initRoute;
