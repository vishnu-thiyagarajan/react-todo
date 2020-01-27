import React from 'react'
import './DeleteList.css'
import { Button } from './Button'
export function DeleteList (props) {
  const list = props.listname
  const deleteList = () => {
    props.handler({
      lists: props.lists.filter((item) => {
        if (item.selected) {
          window.fetch('http://localhost:5000/list', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: item.id })
          }).catch(function (err) {
            console.log('Fetch Error :', err)
          })
        }
        return !item.selected
      })
    })
  }
  const toggleDone = () => {
    props.handler({ showDone: !props.showDone })
  }
  const selectedListCount = () => props.lists.filter(item => item.selected).length > 0
  const selectedTaskCount = () => {
    if (!list) return false
    return props.lists[props.index].tasks.filter(item => item.done).length > 0
  }
  return (
    <div id='delbar'>
      {selectedListCount() && !list && <Button text='Delete' onclick={deleteList} />}
      {selectedTaskCount() && list && <Button text='Done' onclick={toggleDone} />}
    </div>
  )
}
