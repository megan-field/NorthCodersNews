const {updateCommentVotes, deleteCommentById, getOneComment} = require('../controllers/comments');
const express = require('express');
const router = express.Router();

router.route('/:comment_id')
  .get(getOneComment)
  .put(updateCommentVotes)
  .delete(deleteCommentById);

module.exports = router;
