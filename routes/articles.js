const {getAllArticles, getAllCommentsByArticle, addCommentByArticle, updateArticleVotes} = require('../controllers/articles');
const express = require('express');
const router = express.Router();


router.route('/')
  .get(getAllArticles);
  
  router.route('/:article_id/comments')
  .get(getAllCommentsByArticle)
  .post(addCommentByArticle);
  
  router.route('/:article_id')
    .put(updateArticleVotes);

module.exports = router;