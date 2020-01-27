'use strict'
// require mongoose module
const mongoose = require('mongoose')
require('dotenv').config()
require('./list.model.js')
// require chalk module to give colors to console text
const chalk = require('chalk')
// require database URL from properties file
const dbPATH = `${process.env.DB_DOMAIN}:${process.env.DB_PORT}/${process.env.DB_NAME}`
const dbURL = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${dbPATH}`

const connected = chalk.bold.cyan
const error = chalk.bold.yellow
const disconnected = chalk.bold.red
const termination = chalk.bold.magenta

// export this function and imported by server.js
module.exports = function () {
  mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })

  mongoose.connection.on('connected', function () {
    console.log(connected('Mongoose default connection is open to ', dbPATH))
  })

  mongoose.connection.on('error', function (err) {
    console.log(error('Mongoose default connection has occured ' + err + ' error'))
  })

  mongoose.connection.on('disconnected', function () {
    console.log(disconnected('Mongoose default connection is disconnected'))
  })

  process.on('SIGINT', function () {
    mongoose.connection.close(function () {
      console.log(termination('Mongoose default connection is disconnected due to application termination'))
      process.exit(0)
    })
  })
}
