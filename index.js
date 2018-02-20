const app = require('./app');
const PORT = require('./configuration').PORT[process.env.NODE_ENV];

app.listen(PORT, function () {
  console.log(`listening on port ${PORT}`);
});
