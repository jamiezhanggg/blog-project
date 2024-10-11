const express = require('express');
const initDB = require('./init/initDB');
const initServer = require('./init/initServer');

const app = express();
const main = async () => {
    await initDB();
    await initServer(app);
}
main();
