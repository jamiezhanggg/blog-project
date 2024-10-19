const userRoute = require('../routes/user');
const followRoute = require('../routes/follow');

const initRoute = (app) => {
    app.use('/api/v1/user', userRoute);
    app.use('/api/v1/follow', followRoute);
};

module.exports = initRoute;
