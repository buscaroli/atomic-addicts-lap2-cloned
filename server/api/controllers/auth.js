require('dotenv').config()

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/user')

//register a new user and use bcrypt to store password_digest
async function registerUser(req, res) {
  try {
    const salt = await bcrypt.genSalt()
    const hashed = await bcrypt.hash(req.body.password, salt)
    await User.create({ ...req.body, password: hashed })

    const payload = { username: req.body.username, email: req.body.email }
    console.log('payload: ', payload)

    const sendToken = (err, token) => {
      if (err) {
        throw new Error('Error in token generation')
      }
      res.status(201).json({
        success: true,
        token: 'Bearer ' + token,
      })
    }
    console.log('secret: ', process.env.SECRET)

    jwt.sign(payload, process.env.SECRET, { expiresIn: 6000 }, sendToken)
  } catch (err) {
    res.status(500).json({ err })
  }
}
//login a user and use bcrypt to compare password with digest in db, and jwt to generate a token
async function loginUser(req, res) {
  try {
    const user = await User.findByEmail(req.body.email)
    if (!user) {
      throw new Error('No user with this email')
    }
    const authed = bcrypt.compare(req.body.password, user.passwordDigest)
    if (!!authed) {
      const payload = { username: user.username, email: user.email }
      const sendToken = (err, token) => {
        if (err) {
          throw new Error('Error in token generation')
        }
        res.status(200).json({
          success: true,
          token: 'Bearer ' + token,
        })
      }
      jwt.sign(payload, process.env.SECRET, { expiresIn: 600 }, sendToken)
    } else {
      throw new Error('User could not be authenticated')
    }
  } catch (err) {
    console.log(err)
    res.status(401).json({ err })
  }
}

module.exports = { registerUser, loginUser }
