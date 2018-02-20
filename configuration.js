module.exports = {
  DB: {
    test: 'mongodb://localhost/northcoders-news-api-test',
    dev: 'mongodb://localhost/northcoders-news',
    production: process.env.DB
  },
  PORT: {
    test: 3090,
    dev: 3000,
    production: process.env.PORT
  }
};
