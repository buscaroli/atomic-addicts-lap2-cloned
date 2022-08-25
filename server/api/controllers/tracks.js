const Tracking = require('../models/track');
const User = require('../models/user');
const jwt_decode = require('jwt-decode');

//get all tracking preferences in tracking table
async function getAllTracking(req, res) {
    try {
        const trackings = await Tracking.all
        res.status(200).json(trackings)
    } catch (err) {
        res.status(500).json({err})
    }
}

//get tracking preferences for specific username
async function getUserTrackingsByUsername(req, res) {
    try {
        const trackings = await Tracking.findTrackingByUsername(req.headers.authorization)
        res.status(200).json(trackings)
    } catch (err) {
        res.status(500).json({err})
    }
}

//update tracking prefernces by username (if user doesnt exist, throws error; if no tracking for a user, tracking is created; if tracking exists, tracking updated)
async function updateUserTrackings(req, res) {
    try {
        const decoded = jwt_decode(req.headers.authorization)
                const username = decoded.username
        if(User.findByUsername(username) === -1){
            throw new Error
        }if(Tracking.findTrackingByUsername(req.headers.authorization) === -1) {
            const tracking = await Tracking.create(req.headers.authorization, req.body);
        res.status(200).json(tracking)
        }if(Tracking.findTrackingByUsername(req.headers.authorization) !== -1){
        const tracking = await Tracking.update(req.headers.authorization, req.body);
        res.status(200).json(tracking)
        }
    } catch (err) {
        res.status(422).json({err})
    }
}

//gets the combined last entry and tracking preferences by username
async function getCurrentTrackingDataByUsername(req, res) {
    try {
        const trackings = await Tracking.getCurrentTrackingData(req.headers.authorization)
        res.status(200).json(trackings)
    }catch(err){
        res.status(422).json({err})
    }
}

module.exports = { getAllTracking, getUserTrackingsByUsername, updateUserTrackings, getCurrentTrackingDataByUsername}
