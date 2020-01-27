import React, { useState, useEffect } from 'react'
import './App.css'
import { NavBar } from './NavBar'
import { DeleteList } from './DeleteList'
import { AddTask } from './AddTask'
import { List } from './List'
import { FilterTask } from './FilterTask'
import { Task } from './Task'

export function App (props) {
  const [todoObj, setTodoObj] = useState({
    section: 'Lists',
    lists: []
  })
  const fetchData = () => {
    window.fetch('http://localhost:5000/list')
      .then(response => response.json()).then(data => {
        data.forEach(element => {
          element.display = true
          element.tasks.map(item => ({ ...item, listid: element.id }))
        })
        setTodoObj({ ...todoObj, lists: data })
      })
      .catch(function (err) {
        console.log('Fetch Error :', err)
      })
  }
  useEffect(() => {
    fetchData()
    // eslint-disable-next-line
  }, [])
  const handler = (obj) => setTodoObj({ ...todoObj, ...obj })
  const section = todoObj.section
  const input = todoObj.input
  const currentlistid = todoObj.currentlistid
  const currentlistname = todoObj.currentlistname
  const list = todoObj.lists
  const index = todoObj.key
  const showDone = todoObj.showDone
  let filterTasks = []
  if (section !== 'Lists') {
    for (const eachList of list) {
      filterTasks.push(...eachList.tasks.map(item => ({
        ...item,
        listname: eachList.listname,
        listid: eachList.id
      })))
    }

    const today = new Date().toISOString().slice(0, 10)
    if (section === 'Today') filterTasks = filterTasks.filter(item => item.duedate === today)
    if (section === 'Scheduled') filterTasks = filterTasks.filter(item => item.duedate !== '')
    console.log(filterTasks)
  }
  return (
    <div>
      <NavBar
        handler={handler} section={section}
        listname={currentlistname} lists={list}
        input={input} index={index}
      />
      {!currentlistid && section === 'Lists' &&
        <div>
          <div className='container'>
            {list.map((_item, _id) => {
              if (_item.display) {
                return (
                  <List
                    item={_item}
                    key={_id}
                    lists={list}
                    handler={handler}
                    tasklist={_item.tasks.map(elem => elem.taskname)}
                  />
                )
              }
              return (<div key={_id} />)
            })}
          </div>
        </div>}
      {(section !== 'Lists' || currentlistid) &&
        <div>
          <div className='taskcontainer'>
            {currentlistid && list[index].tasks.filter(item => {
              if (showDone) return !item.done
              return true
            }).map((_item, _id) => {
              return (
                <Task
                  obj={_item} key={_id} listid={currentlistid}
                  lists={list} index={index} handler={handler}
                />
              )
            })}
            {!currentlistid && filterTasks.map((_item) => {
              return (
                <FilterTask
                  obj={_item} key={_item.id}
                  lists={list} handler={handler}
                />
              )
            })}
          </div>
          <AddTask
            handler={handler} listname={currentlistname} listid={currentlistid}
            index={index} lists={list}
          />
        </div>}
      <DeleteList
        handler={handler}
        lists={list} listname={currentlistname}
        showDone={showDone} index={index}
      />
    </div>
  )
}
