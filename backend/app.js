const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const initDB = require('./src/init/initDB');
const initServer = require('./src/init/initServer');
const initRoute = require('./src/init/initRoute');

const noMatchMiddleware = require('./src/middleware/404.middleware');
const errorMiddleWare = require('./src/middleware/error.middleware');


const app = express();

app.use(cors({
    credentials: true,
    origin: true
}));
app.use(express.json());
app.use(morgan('tiny'));

const main = async () => {
    await initDB();
    await initServer(app);
    initRoute(app);

    app.use(noMatchMiddleware);
    app.use(errorMiddleWare);
}
main();
