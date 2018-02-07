const url =require('url');
const mongoose =require('mongoose');
const {db} =require('../config');

const Topic = require('../models/topics');
const Article = require('../models/articles');


const getAllTopics = (req, res, next) => {
      Topic.find({}, {_id: false, slug: false, __v: false})
        .then(topics => res.send(topics))
        .catch(err => next(err))
    }

const getArticlesByTopic = (req, res, next) => {
    const {topic} = req.params
    Article.find({belongs_to: topic}, {_id: false, __v:false})
    .then(articles => res.send(articles))
    .catch(err => next(err))
}

module.exports = {getAllTopics, getArticlesByTopic}