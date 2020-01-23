import React, { useState } from 'react'
import './AddTask.css'
import { Button } from './Button'
export function AddTask (props) {
  const list = props.listname
  const [showAddTask, setShowAddTask] = useState(false)
  const addTask = (event) => {
    if (event.key === 'Enter' && event.target.value) {
      const temp = props.lists
      const key = props.index
      temp[key].tasks = [...temp[key].tasks, {
        id: temp[key].tasks.length ? parseInt(temp[key].tasks[temp[key].tasks.length - 1].id) + 1 : 0,
        taskname: event.target.value,
        listname: list,
        listid: props.listid,
        notes: '',
        priority: 0,
        duedate: '',
        done: false
      }]
      props.handler({ lists: temp })
      event.target.value = ''
    }
  }
  const toggleAddTask = () => { setShowAddTask(!showAddTask) }
  return (
    <div id='addtask'>
      {list && !showAddTask && <Button text='Add Task' onclick={toggleAddTask} />}
      {list && showAddTask &&
        <input
          autoFocus type='text'
          placeholder='Task name ...' onBlur={toggleAddTask} onKeyUp={addTask}
        />}
    </div>
  )
}
