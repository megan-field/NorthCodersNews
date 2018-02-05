const url = require('url')
const mongoose = require('mongoose')
const {db} = require('../config')

const Article = require('../models/articles')
const Comment = require('../models/comments')

const getAllArticles = (req, res) => {
    Article.find({}, {__v: false})
    .then(articles => res.send(articles))
}

const getAllCommentsByArticle = (req, res) => {
    const {article_id} = req.params

    Comment.find({belongs_to: article_id}, {__v: false})
    .then(comments => res.send(comments))
}

const addCommentByArticle = (req, res) => {
    // const {} = req.params
    // const {comment} = req.body
}

const updateArticleVotes = (req, res) => {}

module.exports = {getAllArticles, getAllCommentsByArticle, addCommentByArticle, updateArticleVotes}