import React, { useState } from 'react'
import './FilterTask.css'
import { Button } from './Button'
export function FilterTask (props) {
  const [openTask, setOpenTask] = useState(false)
  const openEditTask = (event) => setOpenTask(!openTask)
  const saveTask = (event) => {
    const temp = props.lists
    const element = event.target
    const elemntId = element.id || element.parentNode.id || element.parentNode.parentNode.id
    const [taskid, listid] = elemntId.split('|')
    const key = temp.findIndex(item => item.id === Number(listid))
    const tkey = temp[key].tasks.findIndex(item => item.id === Number(taskid))
    if (element.tagName === 'TEXTAREA') temp[key].tasks[tkey].notes = element.value
    if (element.tagName === 'SELECT') temp[key].tasks[tkey].priority = element.value
    if (element.tagName === 'INPUT' && element.type === 'text') temp[key].tasks[tkey].taskname = element.value
    if (element.tagName === 'INPUT' && element.type === 'date') temp[key].tasks[tkey].duedate = element.value
    if (element.tagName === 'INPUT' && element.type === 'checkbox') temp[key].tasks[tkey].done = element.checked
    temp[key].tasks[tkey].listid = Number(listid)
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
    const temp = props.lists
    const elemntId = event.target.id || event.target.parentNode.id
    const [taskid, listid] = elemntId.split('|')
    const key = temp.findIndex(item => item.id === Number(listid))
    let objToBeDeleted
    temp[key].tasks = temp[key].tasks.filter(item => {
      if (item.id === Number(taskid)) objToBeDeleted = item
      return item.id !== Number(taskid)
    })
    objToBeDeleted.listid = Number(listid)
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
      <div className='filtertask' onClick={openEditTask}>
        <input type='checkbox' id={props.obj.id + '|' + props.obj.listid} checked={props.obj.done} onChange={saveTask} />
        <p id={props.obj.id + '|' + props.obj.listid}>{props.obj.taskname}</p>
        <p>{props.obj.duedate}</p>
        <p>{props.obj.listname}</p>
      </div>
      {openTask &&
        <div className='grid-container'>
          <div className='notes'>
            Notes:
            <br />
            <textarea
              id={props.obj.id + '|' + props.obj.listid}
              rows='10' columns='200' value={props.obj.notes} onChange={saveTask} />
          </div>
          <div className='priority'>
            Priority:
            <br />
            <select id={props.obj.id + '|' + props.obj.listid} value={props.obj.priority} onChange={saveTask}>
              <option value='0'>None</option>
              <option value='1'>Low</option>
              <option value='2'>Medium</option>
              <option value='3'>High</option>
            </select>
          </div>
          <div className='duedate'>
            Due Date:
            <br />
            <input
              id={props.obj.id + '|' + props.obj.listid}
              type='date' value={props.obj.duedate} onChange={saveTask} />
          </div>
          <Button text='Delete' onclick={deleteTask} />
        </div>}
    </div>
  )
}
