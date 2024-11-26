const express = require('express');
const route = express.Router();
const {authMiddleware} = require('../middleware/admin/auth.middleware');
const CommentController = require('../controller/comment');

route.post('/:slug', authMiddleware, CommentController.createComment);
route.get('/:slug', CommentController.getComments);
route.delete('/:slug/:id', authMiddleware, CommentController.removeComment);

module.exports = route;

