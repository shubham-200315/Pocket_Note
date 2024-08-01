const express = require('express');
const router = express.Router();
const groupController = require('../controllers/groupController');

router.post('/groups', groupController.createGroup);
router.delete('/groups/:groupId', groupController.deleteGroup);

module.exports = router;
