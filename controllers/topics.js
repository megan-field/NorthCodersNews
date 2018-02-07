const url =require('url');
const mongoose =require('mongoose');
const {db} =require('../config');

const Topic = require('../models/topics');
const Article = require('../models/articles');


const getAllTopics = (req, res) => {
      Topic.find({}, {_id: false, slug: false, __v: false})
        .then(topics => res.send(topics))
        .catch(console.error)
    }

const getArticlesByTopic = (req, res) => {
    const {topic} = req.params
    Article.find({belongs_to: topic}, {_id: false, __v:false})
    .then(articles => res.send(articles))
    .catch(console.error)
}

module.exports = {getAllTopics, getArticlesByTopic}