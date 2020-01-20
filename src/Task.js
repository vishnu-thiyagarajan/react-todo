import React from 'react'
import './Task.css'
export function Task (props) {
  return (
    <div id={props.obj.id} className='task'>
      <input type='checkbox' onChange={props.taskDone} />
      <p>{props.obj.taskname}</p>
    </div>
  )
}
