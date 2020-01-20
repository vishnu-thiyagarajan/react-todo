import React from 'react'
import './List.css'
export function List (props) {
  return (
    <div className='innercontainer'>
      <div onDoubleClick={props.openList} onClick={props.toggleSelect} className={`item ${props.item.selected ? 'selected' : ''}`} id={props.item.id}>
        <p>no tasks</p>
      </div>
      {!props.item.text && <p id={props.item.id} onClick={props.toggleText}>{props.item.listname}</p>}
      {props.item.text &&
        <input
          id={props.item.id}
          autoFocus onChange={props.setListName}
          onBlur={props.toggleText}
          onKeyUp={(event) => { if (event.key === 'Enter') props.toggleText(event) }}
          type='text' value={props.item.listname}
        />}
    </div>
  )
}
