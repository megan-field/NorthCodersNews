const app = require('./app')
const PORT = require('./configuration').PORT['dev']

app.listen(PORT, function () {
  console.log(`listening on port ${PORT}`)
})
