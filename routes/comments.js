const {updateCommentVotes, deleteCommentById} = require('../controllers/comments');
const express = require('express');
const router = express.Router();

router.route('/:comment_id')
  .put(updateCommentVotes)
  .delete(deleteCommentById);

module.exports = router;