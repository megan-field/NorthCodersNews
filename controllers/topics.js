const Topic = require('../models/topics');
const Article = require('../models/articles');

const getAllTopics = (req, res, next) => {
  Topic.find({}, { _id: false, __v: false })
    .then(topics => res.send({ topics }))
    .catch(err => next(err));
};

const getArticlesByTopic = (req, res, next) => {
  const { topic } = req.params;
  Article.find({ belongs_to: topic }, { __v: false })
    .then(articles => {
      if (articles.length > 0) res.send({articles});
      else return res.status(400).send({ message: 'Not a Valid Topic' });
    })
    .catch(err => next(err));
};

module.exports = { getAllTopics, getArticlesByTopic };
