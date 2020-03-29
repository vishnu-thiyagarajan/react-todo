import React from 'react'
import './NavBar.css'
import { Button } from './Button'
export function NavBar (props) {
  const list = props.listname
  const section = props.section
  const input = props.input
  const setInput = (event) => {
    const toToggle = event.target.innerText
    if (toToggle === input) {
      props.handler({ input: '' })
      if (toToggle === 'Search') searchList()
    }
    if (toToggle !== input) props.handler({ input: toToggle })
  }
  const activeLists = (event) => {
    const selectedSection = event.target.innerText
    if (selectedSection !== 'Lists') props.handler({ section: selectedSection, input: '' })
    if (selectedSection === 'Lists') props.handler({ section: selectedSection })
  }
  const addNewList = (event) => {
    if (event.key === 'Enter' && event.target.value) {
      const data = {
        id: props.lists.length ? parseInt(props.lists[props.lists.length - 1].id) + 1 : 0,
        listname: event.target.value,
        display: true,
        tasks: []
      }
      props.handler({ lists: [...props.lists, data] })
      window.fetch('https://todomongoapi.herokuapp.com/list', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      }).catch(function (err) {
        console.log('Fetch Error :', err)
      })
      event.target.value = ''
    }
  }
  const searchList = (event) => {
    const srchInput = event ? event.target.value : ''
    const temp = props.lists
    if (srchInput) temp.forEach((item) => { item.display = item.listname.includes(srchInput) })
    if (!srchInput || !props.input) temp.forEach((item) => { item.display = true })
    props.handler({ lists: temp })
  }
  const goback = () => {
    props.handler({
      key: undefined,
      currentlistid: undefined,
      currentlistname: undefined,
      section: 'Lists'
    })
  }
  const deleteTask = (objToBeDeleted) => {
    window.fetch('https://todomongoapi.herokuapp.com/task', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(objToBeDeleted)
    }).catch(function (err) {
      console.log('Fetch Error :', err)
    })
  }
  const clearDone = (event) => {
    const temp = props.lists
    const key = props.index
    if (!isNaN(Number(key))) {
      temp[key].tasks = temp[key].tasks.filter(item => {
        item.listid = temp[key].id
        if (item.done) deleteTask(item)
        return !item.done
      })
    }
    if (section === 'Today') {
      const today = new Date().toISOString().slice(0, 10)
      for (const key in temp) {
        temp[key].tasks = temp[key].tasks.filter(item => {
          item.listid = temp[key].id
          if (item.done && item.duedate === today) deleteTask(item)
          return !item.done && item.duedate === today
        })
      }
    }
    if (section === 'Scheduled') {
      for (const key in temp) {
        temp[key].tasks = temp[key].tasks.filter(item => {
          item.listid = temp[key].id
          if (item.done && item.duedate !== '') deleteTask(item)
          return !item.done && item.duedate !== ''
        })
      }
    }
    props.handler({ lists: temp })
  }

  return (
    <div id='navbar'>
      {(section !== 'Lists' || list) && <Button text='Back' onclick={goback} />}
      {(section === 'Lists' && !list) && <Button text='NewList' onclick={setInput} />}
      {!list &&
        <div id='buttongroup'>
          <Button text='Lists' onclick={activeLists} class={section === 'Lists' ? 'active' : ''} />
          <Button text='Today' onclick={activeLists} class={section === 'Today' ? 'active' : ''} />
          <Button text='Scheduled' onclick={activeLists} class={section === 'Scheduled' ? 'active' : ''} />
        </div>}
      {list && <p>{list}</p>}
      {(section !== 'Lists' || list) && <Button text='Clear Done' onclick={clearDone} />}
      {(section === 'Lists' && !list) && <Button text='Search' onclick={setInput} />}
      <div id='inputbar'>
        {input === 'NewList' && <input autoFocus type='text' placeholder='List Name...' onKeyUp={addNewList} />}
        {input === 'Search' && <input autoFocus type='search' placeholder='Search...' onKeyUp={searchList} />}
      </div>
    </div>
  )
}
