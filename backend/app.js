const express = require('express');
const initDB = require('./src/init/initDB');
const initServer = require('./src/init/initServer');
const initRoute = require('./src/init/initRoute');

const app = express();
const main = async () => {
    await initDB();
    await initServer(app);
    initRoute(app);
}
main();
