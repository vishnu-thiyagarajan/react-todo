import React from 'react'
import './List.css'
export function List (props) {
  const openList = (event) => {
    const id = event.target.id || event.target.parentNode.id
    const key = props.lists.findIndex(item => item.id === Number(id))
    props.handler({
      input: '',
      key: key,
      currentlistid: id,
      currentlistname: props.lists[key].listname
    })
  }
  const setListName = (event) => {
    if (event.target.value) {
      const temp = props.lists
      const key = temp.findIndex(item => item.id === Number(event.target.id))
      temp[key].listname = event.target.value
      props.handler({ lists: temp })
    }
  }
  const toggleText = (event) => {
    const temp = props.lists
    const key = temp.findIndex(item => item.id === Number(event.target.id))
    temp[key].text = !temp[key].text
    props.handler({ lists: temp })
  }
  const toggleSelect = (event) => {
    event.preventDefault()
    const temp = props.lists
    const id = event.target.id || event.target.parentNode.id
    const key = temp.findIndex(item => item.id === Number(id))
    temp[key].selected = !temp[key].selected
    props.handler({ lists: temp })
  }
  return (
    <div className='innercontainer'>
      <div onDoubleClick={openList} className={`item ${props.item.selected ? 'selected' : ''}`} id={props.item.id}>
        <div onDoubleClick={openList} onClick={toggleSelect} className='overflow' id={props.item.id}>
          <p onDoubleClick={openList} id={props.item.id}>{props.tasklist ? props.tasklist : 'no tasks'}</p>
        </div>
      </div>
      {!props.item.text && <p id={props.item.id} onClick={toggleText}>{props.item.listname}</p>}
      {props.item.text &&
        <input
          id={props.item.id}
          autoFocus onChange={setListName}
          onBlur={toggleText}
          onKeyUp={(event) => { if (event.key === 'Enter') toggleText(event) }}
          type='text' value={props.item.listname}
        />}
    </div>
  )
}
