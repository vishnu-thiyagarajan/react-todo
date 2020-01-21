const express = require('express')
const mongoose = require('mongoose')
const ListModel = mongoose.model('List')
const router = express.Router()

router.get('/list', (req, res) => {
  ListModel.find((err, docs) => {
    if (err) throw err
    res.status(200).send(docs)
  })
})

router.post('/list', (req, res) => {
  var list = new ListModel()
  list.id = req.body.id
  list.listname = req.body.listname
  list.tasks.push(req.body.tasks)
  list.save((err, docs) => {
    if (err) throw err
    res.status(200).send({ message: 'successful', status: 'OK' })
  })
})

module.exports = router
