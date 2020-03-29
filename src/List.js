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
    const name = event.target.value
    if (name) {
      const listid = event.target.id
      const temp = props.lists
      const key = temp.findIndex(item => item.id === Number(listid))
      temp[key].listname = event.target.value
      props.handler({ lists: temp })
      window.fetch('https://todomongoapi.herokuapp.com/list', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: listid, listname: name })
      }).catch(function (err) {
        console.log('Fetch Error :', err)
      })
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
      <div onDoubleClick={openList} onClick={toggleSelect} className={`item ${props.item.selected ? 'selected' : ''}`} id={props.item.id}>
        <div onDoubleClick={openList} onClick={toggleSelect} id={props.item.id}>
          {props.tasklist && props.tasklist.map((i, k) => <label onClick={toggleSelect} id={props.item.id} key={k} onDoubleClick={openList}>{i}<br /></label>)}
          {!props.tasklist.length && <p onClick={toggleSelect}>no tasks</p>}
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
