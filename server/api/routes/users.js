const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');

const { verifyToken } = require('../middleware/auth');
//add verifyToken to all routes once finished

router.get('/', usersController.index);
router.get('/username/', verifyToken, usersController.getByUsername)
// router.get('/', usersController.getById);

module.exports = router;