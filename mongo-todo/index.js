const connection = require('./model')
const express = require('express')
const app = express()
const lists = require('./controls/lists')
app.use(express.json())
app.use(lists)
app.use((req, res, next) => {
  res.status(404).send('<h1>404 Not Found</h1>')
})
app.listen('5000', () => {
  console.log('listenong on port 5000')
})
