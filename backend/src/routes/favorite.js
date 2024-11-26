const express = require('express');
const route = express.Router();
const {authMiddleware} = require('../middleware/admin/auth.middleware');
const FavoriteController = require('../controller/favorite');

route.put('/:slug', authMiddleware, FavoriteController.addFavorite);
route.delete('/:slug', authMiddleware, FavoriteController.removeFavorite);

module.exports = route;

