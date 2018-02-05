const url = require('url')
const mongoose = require('mongoose')
const {db} = require('../config')

const User = require('../models/users')

const getUsersByUsername = (req, res) => {
    const {username} = req.params
    User.find({username}, {__v: false})
    .then(user => res.send(user))
}

module.exports = {getUsersByUsername}