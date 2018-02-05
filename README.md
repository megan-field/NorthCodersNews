# NorthCodersNews

-using http://northcoders-news-api.herokuapp.com/ to see the response of each route.
-thinking about the layout of the front end and exactly what things will need to be defined. 
-testing each route!!

## call on these routes;

GET /api/topics                             -Get all the topics
GET /api/topics/:topic_id/articles          -Return all the articles for a certain topic
GET /api/articles                           -Returns all the articles
GET /api/articles/:article_id/comments      -Get all the comments for a individual article
POST /api/articles/:article_id/comments     -Add a new comment to an article. This route requires a JSON body with a comment key and value pair e.g: {"comment": "This is my new comment"}
PUT /api/articles/:article_id               -Increment or Decrement the votes of an article by one. This route requires a vote query of 'up' or 'down'  e.g: /api/articles/:article_id?vote=up
PUT /api/comments/:comment_id               -Increment or Decrement the votes of a comment by one. This route requires a vote query of 'up' or 'down'   e.g: /api/comments/:comment_id?vote=down
DELETE /api/comments/:comment_id            -Deletes a comment
GET /api/users/:username                    -Returns a JSON object with the profile data for the specified user.


## notes

https://mongoosejs.com/docs/api.html#model_Model
    -find
    -findOne
    -findOneAndUpdate
    -findOneAndRemove
    -findById
    -findByIdAndUpdate
    -findByIdAndRemove
    -update
    --------------
    -remove
    -save
    -count