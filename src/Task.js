import React, { useState } from 'react'
import './Task.css'
import { Button } from './Button'
export function Task (props) {
  const [openTask, setOpenTask] = useState(false)
  const [inputTask, setInputTask] = useState(false)
  const openEditTask = (event) => setOpenTask(!openTask)
  const toggleName = (event) => setInputTask(!inputTask)
  return (
    <div>
      <div id={props.obj.id} className='task' onClick={openEditTask}>
        <input type='checkbox' checked={props.obj.done} onChange={props.taskDone} onClick={event => event.stopPropagation()} />
        {!inputTask && <p onClick={toggleName}>{props.obj.taskname}</p>}
        {inputTask && <input autoFocus type='text' onChange={props.saveTask} onClick={toggleName} value={props.obj.taskname} />}
      </div>
      {openTask &&
        <div id={props.obj.id} className='grid-container'>
          <div className='notes'>
            Notes:
            <br />
            <textarea rows='10' columns='200' value={props.obj.notes} onChange={props.saveTask}/>
          </div>
          <div className='priority'>
            Priority:
            <br />
            <select value={props.obj.priority} onChange={props.saveTask}>
              <option value='0'>None</option>
              <option value='1'>Low</option>
              <option value='2'>Medium</option>
              <option value='3'>High</option>
            </select>
          </div>
          <div className='duedate'>
            Due Date:
            <br />
            <input type='date' value={props.obj.duedate} onChange={props.saveTask} />
          </div>
          <Button text='Delete' onclick={props.deleteTask} />
        </div>}
    </div>
  )
}
