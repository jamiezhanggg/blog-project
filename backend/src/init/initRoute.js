const userRoute = require('../routes/user');

const initRoute = (app) => {
    app.use('/api/v1', userRoute);
};

module.exports = initRoute;
