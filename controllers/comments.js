const Comment = require('../models/comments')

const getOneComment = (req, res) => {
  const {comment_id} = req.params
  Comment.find({_id: comment_id}, {__v: false})
  .then(comment=> res.send(comment))
  .catch(console.error)
}

const updateCommentVotes = (req, res) => {
  const { comment_id } = req.params;
  let { vote } = req.body;
  let num;
  if (vote === 'up') num = 1;
  if (vote === 'down') num = -1;

  Comment.findByIdAndUpdate({ _id: comment_id }, { $inc: { votes: num } })
    .then(comment => {
      res.status(201)
      res.send(comment)
    })
    .catch(console.error)
}

const deleteCommentById = (req, res) => {
  const { comment_id } = req.params;
  Comment.remove({ _id: comment_id })
    .then(() => {
      res.status(202)
      res.send(`comment ${comment_id} was deleted`);
    })
    .catch(console.error)
}

module.exports = { deleteCommentById, updateCommentVotes, getOneComment }