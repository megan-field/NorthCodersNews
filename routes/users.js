const {getUsersByUsername} = require('../controllers/users');
const express = require('express');
const router = express.Router();

router.route('/:username')
  .get(getUsersByUsername);

module.exports = router;