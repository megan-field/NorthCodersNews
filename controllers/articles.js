const ObjectId = require('mongoose').Types.ObjectId
const Article = require('../models/articles')
const Comment = require('../models/comments')

const getAllArticles = (req, res, next) => {
  const perPage = 10
  const { page } = req.query || 1
  Article.find({}, { __v: false })
    .skip((perPage * page) - perPage)
    .limit(perPage)
    .then(articles => {
      if (articles.length > 0) res.send({ articles: articles, current: page })
      else return res.status(404).send({ message: 'No more articles' })
    })
    .catch(err => next(err))
}

const getOneArticle = (req, res, next) => {
  const { article_id } = req.params
  Article.find({ _id: article_id }, { __v: false })
    .then(article => {
      if (article.length > 0) res.send({ article })
      else return res.status(400).send({ message: 'Not a Valid URL' })
    })
    .catch(err => next(err))
}

const getAllCommentsByArticle = (req, res, next) => {
  const { article_id } = req.params
  const perPage = 5
  const { page } = req.query || 1
  Comment.find({ belongs_to: article_id })
    .sort('-created_at')
    .skip((perPage * page) - perPage)
    .limit(perPage)
    .then(comments => {
      if (comments.length > 0) res.send({ comments: comments, current: page })
      else return res.status(400).send({ message: 'Not a valid URL' })
    })
    .catch(err => next(err))
}

const addCommentByArticle = (req, res, next) => {
  const { article_id } = req.params
  const { body } = req.body
  const addComment = new Comment({
    body: body,
    belongs_to: article_id,
    created_by: 'northcoder'
  })
  addComment.save()
    .then(newComment => res.status(201).send({ newComment }))
    .catch(err => res.status(400).send({ message: "Not a Valid ID" }))
}

const updateArticleVotes = (req, res, next) => {
  const { article_id } = req.params
  const { vote } = req.query
  let num
  if (vote === 'up') num = 1
  if (vote === 'down') num = -1

  Article.findByIdAndUpdate({ _id: article_id }, { $inc: { votes: num } }, { new: true })
    .then(article => {
      if (article !== null) res.status(201).send({ article })
      else return res.status(400).send({ message: "Not a Valid URL, please check you're article id and vote" })
    })
    .catch(err => next(err))
}

module.exports = { getAllArticles, getAllCommentsByArticle, addCommentByArticle, updateArticleVotes, getOneArticle }
