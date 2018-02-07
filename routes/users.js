const {getUsersByUsername, getAllUsers} = require('../controllers/users');
const express = require('express');
const router = express.Router();


router.route('/')
.get(getAllUsers)

router.route('/:username')
  .get(getUsersByUsername);

module.exports = router;