const {getAllTopics, getArticlesByTopic} = require('../controllers/topics')
const express = require('express')
const router = express.Router()

router.route('/')
  .get(getAllTopics)

router.route('/:topic/articles')
  .get(getArticlesByTopic)

module.exports = router
