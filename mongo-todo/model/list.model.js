const mongoose = require('mongoose')
const TaskSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: 'Required'
  },
  taskname: {
    type: String,
    required: 'Required'
  },
  priority: {
    type: Number
  },
  notes: {
    type: String
  },
  duedate: {
    type: String
  },
  listname: {
    type: String,
    required: 'Required'
  },
  listid: {
    type: Number,
    required: 'Required'
  }
})
const ListSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: 'Required'
  },
  listname: {
    type: String,
    required: 'Required'
  },
  tasks: [TaskSchema]
})
mongoose.model('List', ListSchema)
