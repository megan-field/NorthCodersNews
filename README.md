# NorthCodersNews

In order to run NorthCodersNews you will need to have installed Node.js and MongoDB. You can download and install them from thier official websites:
    Node.js - https://nodejs.org/en/
    MongoDB - https://www.mongodb.com/download-center?jmp=nav#community

You will also need to install the necessary dependencies by running 'npm install' in your terminal and to seed the database by runing 'npm run seed'.

Then, in a seperate terminal run 'mongod' and you can begin to run tests and see data on your browser.
- to run tests - npm run test
- to run the server to use the routes on your browser/postman - npm run dev && mongod


## calling on these routes:

- GET /api/topics                             
    - Get all the topics
- GET /api/topics/:topic_id/articles          
    - Return all the articles for a certain topic
- GET /api/articles?page=1                       
    - Returns all the articles, (need - title, body, created_by, belongs_to, votes and comments), paginated with a query string, defaults to 1
- GET /api/articles/:article_id/comments      
    - Get all the comments for a individual article
- POST /api/articles/:article_id/comments     
    - Add a new comment to an article. This route requires a JSON body with a comment key and value pair e.g: {"comment": "This is my new comment"}
- PUT /api/articles/:article_id               
    - Increment or Decrement the votes of an article by one. This route requires a vote query of 'up' or 'down'  e.g: /api/articles/:article_id?vote=up
- PUT /api/comments/:comment_id               
    - Increment or Decrement the votes of a comment by one. This route requires a vote query of 'up' or 'down'   e.g: /api/comments/:comment_id?vote=down
- DELETE /api/comments/:comment_id            
    - Deletes a comment
- GET /api/users/:username                    
    - Returns a JSON object with the profile data for the specified user. (need - username, name, avatar_url)