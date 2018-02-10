const url =require('url');
const mongoose =require('mongoose');
const {db} =require('../config');

const Topic = require('../models/topics');
const Article = require('../models/articles');


const getAllTopics = (req, res, next) => {
      Topic.find({}, {_id: false, __v: false})
        .then(topics => res.send({topics}))
        .catch(err => next(err))
    }

const getArticlesByTopic = (req, res, next) => {
    const {topic} = req.params
    Article.find({belongs_to: topic}, {_id: false, __v:false})
    .then(articles => {
        if (articles.length > 0) res.send({articles})
        else throw err
    })
    .catch(err => res.status(400).send("Not a Valid Topic"))
}

module.exports = {getAllTopics, getArticlesByTopic}