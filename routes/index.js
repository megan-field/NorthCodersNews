const express = require('express');
const topicsRouter = require('./topics');
const articlesRouter = require('./articles');
const commentsRouters = require('./comments');
const usersRouters = require('./users');


const router = express.Router();

router.use('/topics', topicsRouter);
router.use('/articles', articlesRouter);
router.use('/comments', commentsRouters);
router.use('/users', usersRouters);


module.exports = router;