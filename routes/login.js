const express = require('express')
const User  = require('../models/user.js')
const bcrypt  = require('bcrypt')
const jwt  = require('jsonwebtoken')

const router = express.Router()
const prefix = '/login'

router.post(prefix, async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  let body = req.body

  try {
    // We look for email in DB
    const userDB = await User.findOne({ email: body.email })

    // We evaluate if the user exists in DB
    if (!userDB) {
      return res.status(401).json({
        message: 'Invalid email or password',
      })
    }

    // We evaluate the correct password
    if (!bcrypt.compareSync(body.pass, userDB.pass)) {
      return res.status(401).json({
        message: 'Invalid email or password',
      })
    }
    // Generate Token
    let token = jwt.sign(
      {
        data: userDB,
      },
      'secret',
      { expiresIn: 60 * 60 * 24 * 30 },
    ) // Expires in 30 days
    res.setHeader("Content-Type", "application/json")
    // passed the validations
    return res.status(202).json({
      result: userDB,
      token,
    })
  } catch (error) {
    return res.status(404).json({
      message: 'Not Found',
      error,
    })
  }
})

module.exports = router