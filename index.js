const app = require('./app')
const PORT = require('./config').PORT['dev']

app.listen(PORT, function () {
  console.log(`listening on port ${PORT}`)
})
