const express = require('express')
// Middlewares
const checkAuth = require('../middlewares/auth.js')
// Models
const Contact = require('../models/contact.js')

const router = express.Router()

// router.use((req, res, next)= authenticateJWT(req, res, next))
// Get with parameters
router.get('/contact/:id', async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  const _id = req.params.id
  try {
    const contactDB = await Contact.findOne({ _id })
    res.setHeader('Content-Type', 'application/json')
    res.status(202).json({
      result: contactDB,
    })
  } catch (error) {
    return res.status(404).json({
      message: 'Not Found',
      error,
    })
  }
})

//Get with pagination
router.get('/contact', checkAuth, async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  const userId = req.user._id

  const queryLimit = Number(req.query.limit) || 5
  const querySkip = Number(req.query.skip) || 0

  try {
    const contactDB = await Contact.find({ userId })
      .skip(querySkip)
      .limit(queryLimit)

    // count contacts
    const totalContact = await Contact.find({ userId }).countDocuments()
    res.setHeader('Content-Type', 'application/json')
    res.status(202).json({
      result: contactDB,
      total: totalContact,
      limit: queryLimit,
      skip: querySkip,
    })
  } catch (error) {
    return res.status(404).json({
      message: 'Not Found',
      error,
    })
  }
})

router.post('/contact', async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  const body = req.body
  console.log(req.user)
  body.userId = req.user._id

  try {
    const contactDB = await Contact.create(body)
    res.setHeader('Content-Type', 'application/json')
    res.status(201).json({
      result: contactDB,
    })
  } catch (error) {
    return res.status(500).json({
      message: 'An error occurred',
      error,
    })
  }
})

router.delete('/contact/:id', async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  const _id = req.params.id
  try {
    const contactDB = await Contact.findByIdAndDelete({ _id })
    if (!contactDB) {
      return res.status(404).json({
        message: 'Not found',
        error,
      })
    }
    res.setHeader('Content-Type', 'application/json')
    res.status(202).json({
      result: contactDB,
    })
  } catch (error) {
    return res.status(400).json({
      message: 'An error occurred',
      error,
    })
  }
})

router.put('/contact/:id', async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  const _id = req.params.id
  const body = req.body
  try {
    const contactDB = await Contact.findByIdAndUpdate(_id, body, { new: true })
    res.setHeader('Content-Type', 'application/json')
    res.status(202).json({
      result: contactDB,
    })
  } catch (error) {
    return res.status(404).json({
      message: 'Not found',
      error,
    })
  }
})

module.exports = router
