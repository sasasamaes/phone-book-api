import express from 'express'
import _ from 'underscore'
import User from '../models/user.js';
import bcrypt from 'bcrypt'
import checkAuth from '../middlewares/auth.js'

const router = express.Router();
// Hash Password
const saltRounds = 10;
const prefix = '/user'

router.post(prefix,async (req, res) => {

  const body = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phone: req.body.phone,
  }

  body.pass = bcrypt.hashSync(req.body.pass, saltRounds);

  try {

    const userDB = await User.create(body);

    return res.status(202).json({
      result: userDB
    });
    
  } catch (error) {
    return res.status(500).json({
      message: 'An error occurred',
      error
    });
  }

});

router.put(`${prefix}/:id`,(req, res, next)=> checkAuth(req, res, next), async(req, res) => {

  let id = req.params.id;

  let body = _.pick(req.body, ['firstName', 'lastName','email', 'phone', 'pass']);
  if(body.pass){
    body.pass = bcrypt.hashSync(req.body.pass, saltRounds);
  }

  try {
   
    const userDB = await User.findByIdAndUpdate(id, body, {new: true, runValidators: true});


    return res.status(202).json({
      result: userDB
    });

  } catch (error) {
    return res.status(404).json({
      message: 'Not found',
      error
    })
  }

});

module.exports = router