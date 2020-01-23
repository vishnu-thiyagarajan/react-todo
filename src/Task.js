import React, { useState } from 'react'
import './Task.css'
import { Button } from './Button'
export function Task (props) {
  const [openTask, setOpenTask] = useState(false)
  const [inputTask, setInputTask] = useState(false)
  const openEditTask = (event) => setOpenTask(!openTask)
  const toggleName = (event) => setInputTask(!inputTask)
  const saveTask = (event) => {
    const temp = props.lists
    const key = props.index
    const taskid = event.target.id || event.target.parentNode.parentNode.id
    const tkey = temp[key].tasks.findIndex(item => item.id === Number(taskid))
    if (event.target.tagName === 'TEXTAREA') temp[key].tasks[tkey].notes = event.target.value
    if (event.target.tagName === 'SELECT') temp[key].tasks[tkey].priority = event.target.value
    if (event.target.tagName === 'INPUT' && event.target.type === 'text') temp[key].tasks[tkey].taskname = event.target.value
    if (event.target.tagName === 'INPUT' && event.target.type === 'date') temp[key].tasks[tkey].duedate = event.target.value
    props.handler({ lists: temp })
  }
  const taskDone = (event) => {
    const taskid = event.target.id || event.target.parentNode.id
    const temp = props.lists
    const key = props.index
    const tkey = temp[key].tasks.findIndex(item => item.id === Number(taskid))
    temp[key].tasks[tkey].done = !temp[key].tasks[tkey].done
    props.handler({ lists: temp })
  }
  const deleteTask = (event) => {
    const id = event.target.id || event.target.parentNode.id
    const temp = props.lists
    const key = props.index
    temp[key].tasks = temp[key].tasks.filter(item => item.id !== Number(id))
    props.handler({ lists: temp })
  }
  return (
    <div>
      <div id={props.obj.id} className='task' onClick={openEditTask}>
        <input type='checkbox' checked={props.obj.done} onChange={taskDone} onClick={event => event.stopPropagation()} />
        {!inputTask && <p onClick={toggleName}>{props.obj.taskname}</p>}
        {inputTask && <input autoFocus type='text' onChange={saveTask} onClick={toggleName} value={props.obj.taskname} />}
      </div>
      {openTask &&
        <div id={props.obj.id} className='grid-container'>
          <div className='notes'>
            Notes:
            <br />
            <textarea rows='10' columns='200' value={props.obj.notes} onChange={saveTask} />
          </div>
          <div className='priority'>
            Priority:
            <br />
            <select value={props.obj.priority} onChange={saveTask}>
              <option value='0'>None</option>
              <option value='1'>Low</option>
              <option value='2'>Medium</option>
              <option value='3'>High</option>
            </select>
          </div>
          <div className='duedate'>
            Due Date:
            <br />
            <input type='date' value={props.obj.duedate} onChange={saveTask} />
          </div>
          <Button text='Delete' onclick={deleteTask} />
        </div>}
    </div>
  )
}
