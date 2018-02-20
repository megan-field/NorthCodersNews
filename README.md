# NorthCodersNews
***

A RESTful API for Northcoders News. Built using Node(v8.6.0), Express(v4.16.2), MongoDB(v3.4.9), Mongoose(v.5.0.3).

<!-- deployed here() ... -->
***

##Set Up

In order to run NorthCodersNews you will need to have installed npm, git, Node.js and MongoDB. 

First check you have everything installed by opening your terminal and running:
Node.js:    `node -v` 
npm:        `npm -v`
git:        `git --version` 

If you do not have them installed you can download and install them from thier official websites here:
    [Node.js](https://nodejs.org/en/)
    [npm](https://www.npmjs.com/get-npm)
    [git](https://git-scm.com/)
    [MongoDB](https://www.mongodb.com/download-center?jmp=nav#community)
    
***

##Installation 

To run this project you will need to clone it onto your local machine and install it's dependencies.

To do so use the command line to navigate to the directory you'd like to use on your local machine and enter the dollowing command in your terminal window:
`git clone https://github.com/megan-field/NorthCodersNews.git`

Navigate inside the folder and install the necessary dependencies by running:
`npm install`

Then in a new terminal window, navigate into the project folder if not already there and enter the following command to connect to the database and keep it running:
`mongod`

Back in the first terminal window, in order to populate your database you will need to run:
`npm run seed`

And finally to run the server enter the following command:
`npm start`
This will start your server on port 3000

***

##Testing

To test the API, in your terminal, navigate to the correct project folder and enter:
`npm run test`

***

## API Routes:

{% GET /api/topics %}                            
    - Get all the topics
| GET /api/topics/:topic_id/articles |       
    Return all the articles for a certain topic
```GET /api/articles?page=1```                       
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