const express = require('express');
const route = express.Router();
const ArticleController = require('../controller/article');
const { authMiddleware } = require('../middleware/admin/auth.middleware');

route.post('/', authMiddleware, ArticleController.createArticle);
route.get('/:slug', ArticleController.getArticle); // get article with slug
route.put('/:slug', authMiddleware, ArticleController.updateArticle);
route.delete('/:slug', authMiddleware, ArticleController.deleteArticle);
route.get('/follow', authMiddleware, ArticleController.getFollowingArticle);
route.get('/', ArticleController.getArticles);


module.exports = route;