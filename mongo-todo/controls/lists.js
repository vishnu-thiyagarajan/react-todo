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
  list.tasks.push(...req.body.tasks)
  list.save((err, docs) => {
    if (err) throw err
    res.status(200).send({ message: 'successful', status: 'OK' })
  })
})

router.put('/list', (req, res) => {
  ListModel.updateOne({ id: req.body.id }, req.body, function (err) {
    if (err) {
      return res.send(err)
    }
    res.status(200).send({ message: 'successful', status: 'OK' })
  })
})

router.delete('/list', (req, res) => {
  ListModel.deleteOne({ id: req.body.id }, function (err) {
    if (err) {
      return res.send(err)
    }
    res.status(200).send({ message: 'successful', status: 'OK' })
  })
})

router.delete('/task', (req, res) => {
  ListModel.findOne({ id: req.body.listid }, function (err, docs) {
    if (err) throw (err)
    docs.tasks.id(req.body._id).remove()
    docs.save()
    res.status(200).send({ message: 'successful', status: 'OK' })
  })
})

router.put('/task', (req, res) => {
  ListModel.findOne({ id: req.body.listid }, function (err, docs) {
    if (err) throw (err)
    docs.tasks.id(req.body._id).set(req.body)
    docs.save()
    res.status(200).send({ message: 'successful', status: 'OK' })
  })
})

router.post('/task', (req, res) => {
  ListModel.findOne({ id: req.body.listid }, function (err, docs) {
    if (err) throw (err)
    docs.tasks.push(req.body)
    docs.save()
    res.status(200).send({ message: 'successful', status: 'OK' })
  })
})
module.exports = router
