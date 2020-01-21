const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/todo', { useNewUrlParser: true, useUnifiedTopology: true },
  error => {
    if (!error) console.log('connected to mongodb')
    if (error) console.log('error in connecting to mongodb')
  })
const List = require('./list.model.js')
