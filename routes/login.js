import express from 'express'
import User from '../models/user'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const router = express.Router()
const prefix = '/login'

router.post(prefix, async (req, res) => {
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

export default router