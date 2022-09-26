import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import mongoose from 'mongoose';
import history from 'connect-history-api-fallback';
import userRouter from './routes/user.js'
import loginRouter from './routes/login.js'
import contactRouter from './routes/contact.js';

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

