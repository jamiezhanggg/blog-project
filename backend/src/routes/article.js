const express = require('express');
const route = express.Router();
const ArticleController = require('../controller/article');
const { authMiddleware } = require('../middleware/admin/auth.middleware');

route.post('/', authMiddleware, ArticleController.createArticle);

module.exports = route;