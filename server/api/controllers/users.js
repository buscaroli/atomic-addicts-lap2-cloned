const User = require('../models/user');


//gets all users in users table
async function index(req, res) {
    try {
        // const authors = [];
        const users = await User.all
        res.status(200).json(users)
    } catch (err) {
        res.status(500).json({err})
    }
}

//finds user info by their username
async function getByUsername(req, res) {
    try {
        const users = await User.findByUsername(req.params.username)
        res.status(200).json(users)
    } catch (err) {
        res.status(500).json({err})
    }
}

//finds user info by their user id
async function getById(req, res) {
    try {
        const users = await User.findById(req.params.id)
        res.status(200).json(users)
    } catch (err) {
        res.status(204).json({err})
    }
}

module.exports = { index, getByUsername, getById }