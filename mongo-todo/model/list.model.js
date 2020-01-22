const mongoose = require('mongoose')
const TaskSchema = new mongoose.Schema({
  id: Number,
  taskname: String,
  priority: Number,
  notes: String,
  duedate: String,
  listname: String,
  listid: Number
})
const ListSchema = new mongoose.Schema({
  id: Number,
  listname: String,
  tasks: [TaskSchema]
})
mongoose.model('Task', TaskSchema)
mongoose.model('List', ListSchema)
