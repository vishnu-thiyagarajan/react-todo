import React, { useState } from 'react'
import './FilterTask.css'
import { Button } from './Button'
export function FilterTask (props) {
  const [openTask, setOpenTask] = useState(false)
  const openEditTask = (event) => setOpenTask(!openTask)
  const saveTask = (event) => {
    const temp = props.lists
    const element = event.target
    const elemntId = element.id || element.parentNode.parentNode.id
    const [taskid, listid] = elemntId.split('|')
    const key = temp.findIndex(item => item.id === Number(listid))
    const tkey = temp[key].tasks.findIndex(item => item.id === Number(taskid))
    if (element.tagName === 'TEXTAREA') temp[key].tasks[tkey].notes = element.value
    if (element.tagName === 'SELECT') temp[key].tasks[tkey].priority = element.value
    if (element.tagName === 'INPUT' && element.type === 'text') temp[key].tasks[tkey].taskname = element.value
    if (element.tagName === 'INPUT' && element.type === 'date') temp[key].tasks[tkey].duedate = element.value
    props.handler({ lists: temp })
  }
  const taskDone = (event) => {
    const temp = props.lists
    const elemntId = event.target.id || event.target.parentNode.id
    const [taskid, listid] = elemntId.split('|')
    const key = temp.findIndex(item => item.id === Number(listid))
    const tkey = temp[key].tasks.findIndex(item => item.id === Number(taskid))
    temp[key].tasks[tkey].done = !temp[key].tasks[tkey].done
    props.handler({ lists: temp })
  }
  const deleteTask = (event) => {
    const temp = props.lists
    const elemntId = event.target.id || event.target.parentNode.id
    const [taskid, listid] = elemntId.split('|')
    const key = temp.findIndex(item => item.id === Number(listid))
    temp[key].tasks = temp[key].tasks.filter(item => item.id !== Number(taskid))
    props.handler({ lists: temp })
  }
  return (
    <div>
      <div id={props.obj.id + '|' + props.obj.listid} className='filtertask' onClick={openEditTask}>
        <input type='checkbox' checked={props.obj.done} onChange={taskDone} onClick={event => event.stopPropagation()} />
        <p>{props.obj.taskname}</p>
        <p>{props.obj.duedate}</p>
        <p>{props.obj.listname}</p>
      </div>
      {openTask &&
        <div id={props.obj.id + '|' + props.obj.listid} className='grid-container'>
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
