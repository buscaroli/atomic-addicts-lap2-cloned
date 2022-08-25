const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

const { verifyToken } = require('../middleware/auth');
//add verifyToken to all routes once finished

router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);



module.exports = router;