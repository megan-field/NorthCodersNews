const Comment = require('../models/comments');
const ObjectId = require('mongoose').Types.ObjectId;

const getOneComment = (req, res, next) => {
  const { comment_id } = req.params;
  (!ObjectId.isValid(comment_id)) ? res.status(400).send({ message: 'Invalid Article ID' }) :
    Comment.find({ _id: comment_id }, { __v: false })
      .then(comment => {
        if (comment.length > 0) res.send({ comment });
        else return res.status(404).send({ message: 'Not a Valid URL, please check you\'re comment id' });
      })
      .catch(err => next(err));
};

const updateCommentVotes = (req, res, next) => {
  const { comment_id } = req.params;
  const { vote } = req.query;
  let num;
  console.log(vote);
  if (vote === 'up') num = 1;
  if (vote === 'down') num = -1;

  Comment.findByIdAndUpdate({ _id: comment_id }, { $inc: { votes: num } }, { new: true })
    .then(comment => {
      if (comment !== null) res.status(201).send({ comment });
      else return res.status(400).send({ message: 'Not a Valid URL, please check you\'re comment id and vote' });
    })
    .catch(err => next(err));
};

const deleteCommentById = (req, res, next) => {
  const { comment_id } = req.params;

  console.log(ObjectId.isValid(comment_id));
  Comment.remove({ _id: comment_id })
    .then(() => res.status(202).send(`comment ${comment_id} was deleted`))
    .catch(err => next(err));
};

module.exports = { deleteCommentById, updateCommentVotes, getOneComment };
