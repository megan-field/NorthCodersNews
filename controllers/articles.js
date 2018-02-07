const url = require('url')
const mongoose = require('mongoose')
const {db} = require('../config')

const Article = require('../models/articles')
const Comment = require('../models/comments')

const getAllArticles = (req, res) => {
    Article.find({}, {__v: false})
    .then(articles => res.send(articles))
}

const getOneArticle = (req, res) => {
    const {article_id} = req.params
    Article.find({_id: article_id}, {__v: false})
    .then(article => res.send(article))
}

const getAllCommentsByArticle = (req, res) => {
    const {article_id} = req.params

   return Comment.find({belongs_to: article_id})
    .then(comments => {
        res.send({comments})
    })
}

const addCommentByArticle = function(req, res) {
    const {article_id} = req.params;
    const {comment} = req.body;
    const addComment = new Comment({
        body: comment,
        belongs_to: article_id
    })
    return addComment.save()
    .then(newComment => res.send(newComment))
  };
  
  const updateArticleVotes = function(req, res) {
    const {article_id} = req.params;
    let {vote} = req.query;
    let num;
    if (vote === 'up') num = 1;
    if (vote === 'down') num = -1;
      
    Article.findByIdAndUpdate({_id: article_id}, { $inc: {votes: num}})
      .then(article => res.send(article));
  };

module.exports = {getAllArticles, getAllCommentsByArticle, addCommentByArticle, updateArticleVotes, getOneArticle}