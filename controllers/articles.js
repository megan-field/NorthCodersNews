const url = require('url')
const mongoose = require('mongoose')
const {db} = require('../config')

const Article = require('../models/articles')
const Comment = require('../models/comments')

const getAllArticles = (req, res, next) => {
    Article.find({}, {__v: false})
    .then(articles => res.send(articles))
    .catch(err => next(err))
}

const getOneArticle = (req, res, next) => {
    const {article_id} = req.params
    Article.find({_id: article_id}, {__v: false})
    .then(article => res.send(article))
    .catch(err => next(err))
    }


const getAllCommentsByArticle = (req, res, next) => {
    const {article_id} = req.params
   return Comment.find({belongs_to: article_id})
    .then(comments => res.send({comments}))
    .catch(err => next(err))
}

const addCommentByArticle = (req, res, next) => {
    const {article_id} = req.params;
    const {body} = req.body;
    const addComment = new Comment({
        body: body,
        belongs_to: article_id
    })
    return addComment.save()
    .then(newComment => {
        res.status(201)
        res.send(newComment)})
        .catch(err => next(err))
  };
  
  const updateArticleVotes = (req, res, next) => {
    const {article_id} = req.params;
    let {vote} = req.body;
    let num;
    if (vote === 'up') num = 1;
    if (vote === 'down') num = -1;
      
    Article.findByIdAndUpdate({_id: article_id}, { $inc: {votes: num}})
      .then(article => {
          res.status(201)
          res.send(article)
        })
        .catch(err => next(err))
  };

module.exports = {getAllArticles, getAllCommentsByArticle, addCommentByArticle, updateArticleVotes, getOneArticle}