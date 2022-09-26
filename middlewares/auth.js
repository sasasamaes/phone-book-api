import jwt from 'jsonwebtoken'

let checkAuth = (req, res, next) => {
  // headers
  let token = req.get('token') 
  const tokenSecret = 'secret'

  jwt.verify(token,tokenSecret, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        message: 'token error',
        err,
      })
    }
    // We create a new property with the user info
    req.user = decoded //data comes when generating the token in login.js
    next()
  })
}

export default checkAuth

