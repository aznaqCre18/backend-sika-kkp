const express = require('express');
const router = express.Router();

const generalController = require('./../controllers/generalController');
const verifyToken = require('./../middleware/verifyToken');

router.post('/login', generalController.login);
router.patch('/change-password', verifyToken, generalController.changePassword);

module.exports = router;