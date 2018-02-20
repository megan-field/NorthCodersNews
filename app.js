if (!process.env.NODE_ENV) process.env.NODE_ENV = 'dev'

const morgan = require('morgan')
var express = require('express')
var mongoose = require('mongoose')
mongoose.Promise = Promise
var bodyParser = require('body-parser')
var app = express()
const {DB} = require('./configuration')
var db = DB[process.env.NODE_ENV]
const cors = require('cors')
const router = require('./routes/index')
const path = require('path')

app.use(cors())

mongoose.connect(db)
  .then(() => console.log('successfully connected to', db))
  .catch(err => console.log('connection failed', err))

app.use(morgan('dev'))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname+'/index.html'))
})

app.use(bodyParser.json())

app.use('/api', router)

app.use('/*', (req, res) => {
  res.status(404).send({message: 'Sorry that page could not be found'})
})

app.use((error, req, res, next) => {
  (error.name === 'CastError') ? res.status(400).send({message: 'cast error - try checking the url is correct before continuing'}) :
    res.status(500).send({message: error})
})

module.exports = app
