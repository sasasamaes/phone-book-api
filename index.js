const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const dotenv = require('dotenv')
const path = require('path')
const mongoose = require('mongoose')
const history = require('connect-history-api-fallback')
const userRouter = require('./routes/user.js')
const loginRouter = require('./routes/login.js')
const contactRouter = require('./routes/contact.js')

dotenv.config()
const app = express()
const uri = process.env.DB_URL

const options = {useNewUrlParser: true, };

mongoose.connect(uri, options).then(
  /** ready to use. The `mongoose.connect()` promise resolves to mongoose instance. */
  () => { console.log('Connected to DB') },
  /** handle initial connection error */
  err => { console.log(err) }
);




// Middleware
app.use(cors())
app.use(morgan('tiny'))
app.use(express.json())
app.use(express.text())
// application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))
//app.use(express.static(path.join(__dirname, 'public')))

//Routes
app.get('/', (req, res) => {
  res.sendFile('index.html', {root: path.join(__dirname, 'public')});
})
app.use('/api', userRouter);  
app.use('/api', loginRouter);  
app.use('/api', contactRouter);  


app.use(history());
app.use(express.static('public'))
// app.use(express.static(path.join(__dirname, 'public')));

app.set('port', process.env.PORT || 3000)

app.listen(app.get('port'), function () {
  console.log(`Listening on the port ${app.get('port')}`)
})

module.exports = app

