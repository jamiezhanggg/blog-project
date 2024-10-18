const express = require('express');
const router = express.Router();
const UserController = require('../controller/user');
const { authMiddleware } = require('../middleware/admin/auth.middleware');

router.get('/', authMiddleware, UserController.getUser);
router.post('/register', UserController.createUser);
router.post('/login', UserController.login);
router.patch('/', authMiddleware, UserController.updateUser);


module.exports = router;
