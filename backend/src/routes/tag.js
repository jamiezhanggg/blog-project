const express = require('express');
const router = express.Router();
const TagController = require('../controller/tag');

router.get('/', TagController.getTags);
router.post('/', TagController.createTag);

module.exports = router;