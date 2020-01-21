// const connection = require('./model')
const express = require('express')
const app = express()
const lists = require('./controls/lists')
// const path = require('path')
// const expHandlebars = require('express-handlebars')
app.use(express.json())
app.use(lists)
// app.get('/', (req, res, next) => {
//   res.send('<h1>yulu...</h1>')
// })

app.listen('5000', () => {
  console.log('listenong on port 5000')
})
