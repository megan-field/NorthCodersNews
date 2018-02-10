const url = require('url')
const mongoose = require('mongoose')
const {db} = require('../config')
const ObjectId = require('mongoose').Types.ObjectId


const Article = require('../models/articles')
const Comment = require('../models/comments')

const getAllArticles = (req, res, next) => {
    Article.find({}, {__v: false})
    .then(articles => res.send({articles}))
    .catch(err => next(err))
}

const getOneArticle = (req, res, next) => {
    const {article_id} = req.params
    Article.find({_id: article_id}, {__v: false})
    .then(article => {
        if (article.length > 0) res.send({article}) 
        else throw err
    })
    .catch(err => res.status(400).send('Not a Valid ID'))
    }


const getAllCommentsByArticle = (req, res, next) => {
    const {article_id} = req.params
   return Comment.find({belongs_to: article_id})
    .then(comments => {
        if (comments.length > 0) res.send({comments})
        else throw err
    })
    .catch(err => res.status(400).send('Not a Valid ID'))
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
        if (ObjectId.isValid(article_id)) res.status(201).send({newComment})
        else throw err
    })
        .catch(err => res.status(400).send("Not a Valid ID"))
  };
  
  const updateArticleVotes = (req, res, next) => {
    const {article_id} = req.params;
    let {vote} = req.query;
    let num;
    if (vote === 'up') num = 1;
    if (vote === 'down') num = -1;
      
    Article.findByIdAndUpdate({_id: article_id}, { $inc: {votes: num}}, { new: true })
      .then(article => {
      if (article !== null) res.status(201).send({article})
      else throw err
    })
    .catch(err => res.status(400).send("Not a Valid URL, please check you're article id and vote"))
  };

module.exports = {getAllArticles, getAllCommentsByArticle, addCommentByArticle, updateArticleVotes, getOneArticle}