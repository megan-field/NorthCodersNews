if (!process.env.NODE_ENV) process.env.NODE_ENV = 'production';

const morgan = require('morgan');
var express = require('express');
var mongoose = require('mongoose');
mongoose.Promise = Promise;
var bodyParser = require('body-parser');
var app = express();
const {DB} = require('./config');
var db = DB[process.env.NODE_ENV];
const cors = require('cors');

const router = require('./routes/index');
console.log(db)
app.use(cors());

mongoose.connect(db)
  .then(() => console.log('successfully connected to', db))
  .catch(err => console.log('connection failed', err));


app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('All Good')
})

app.use(bodyParser.json());

app.use('/api', router);


module.exports = app;