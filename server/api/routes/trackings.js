const express = require('express');
const router = express.Router();
const trackingsController = require('../controllers/tracks');

const { verifyToken } = require('../middleware/auth');
//add verifyToken to all routes once finished

router.get('/', trackingsController.getAllTracking);

router.get('/username/',  verifyToken, trackingsController.getUserTrackingsByUsername);
// router.get('/user_id/:user_id', trackingsController.getUserTrackingsByUserId);
router.put('/', verifyToken, trackingsController.updateUserTrackings);
router.get('/current/', verifyToken, trackingsController.getCurrentTrackingDataByUsername);
// router.get('/current/:id', trackingsController.getCurrentTrackingDataByUserId);

module.exports = router;