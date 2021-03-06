import React, { useState } from 'react'
import './Task.css'
import { Button } from './Button'
export function Task (props) {
  const [openTask, setOpenTask] = useState(false)
  const [notes, setNotes] = useState(props.obj.notes)
  const [inputTask, setInputTask] = useState(false)
  const openEditTask = (event) => setOpenTask(!openTask)
  const toggleName = (event) => setInputTask(!inputTask)
  const saveTask = (event) => {
    event.stopPropagation()
    const temp = props.lists
    const key = props.index
    const taskid = event.target.id || event.target.parentNode.id || event.target.parentNode.parentNode.id
    const tkey = temp[key].tasks.findIndex(item => item.id === Number(taskid))
    temp[key].tasks[tkey].listid = props.listid
    if (event.target.tagName === 'TEXTAREA') temp[key].tasks[tkey].notes = event.target.value
    if (event.target.tagName === 'SELECT') temp[key].tasks[tkey].priority = event.target.value
    if (event.target.tagName === 'INPUT' && event.target.type === 'text') temp[key].tasks[tkey].taskname = event.target.value
    if (event.target.tagName === 'INPUT' && event.target.type === 'date') temp[key].tasks[tkey].duedate = event.target.value
    if (event.target.tagName === 'INPUT' && event.target.type === 'checkbox') temp[key].tasks[tkey].done = event.target.checked
    window.fetch('https://todomongoapi.herokuapp.com/task', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(temp[key].tasks[tkey])
    }).then(() => { props.handler({ lists: temp }) })
      .catch(function (err) {
        console.log('Fetch Error :', err)
      })
  }
  const deleteTask = (event) => {
    const id = event.target.id || event.target.parentNode.id
    const temp = props.lists
    const key = props.index
    let objToBeDeleted
    temp[key].tasks = temp[key].tasks.filter(item => {
      if (item.id === Number(id)) objToBeDeleted = item
      return item.id !== Number(id)
    })
    objToBeDeleted.listid = temp[key].id
    props.handler({ lists: temp })
    window.fetch('https://todomongoapi.herokuapp.com/task', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(objToBeDeleted)
    }).catch(function (err) {
      console.log('Fetch Error :', err)
    })
  }
  return (
    <div>
      <div className='task' onClick={openEditTask}>
        <input id={props.obj.id} type='checkbox' checked={props.obj.done} onChange={saveTask} />
        {!inputTask && <p onClick={toggleName}>{props.obj.taskname}</p>}
        {inputTask && <input autoFocus type='text' onChange={saveTask} onClick={toggleName} value={props.obj.taskname} />}
      </div>
      {openTask &&
        <div id={props.obj.id} className='grid-container'>
          <div className='notes'>
            Notes:
            <br />
            <textarea rows='10' columns='200' value={notes} onBlur={saveTask} onChange={e => setNotes(e.target.value)}/>
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
