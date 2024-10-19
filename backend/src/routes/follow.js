const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/admin/auth.middleware');

const FollowController = require('../controller/follow');

router.post('/:username', authMiddleware, FollowController.follow);

module.exports = router;