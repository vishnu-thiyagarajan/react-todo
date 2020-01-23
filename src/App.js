import React from 'react'
import './App.css'
import { NavBar } from './NavBar'
import { DeleteList } from './DeleteList'
import { AddTask } from './AddTask'
import { List } from './List'
import { FilterTask } from './FilterTask'
import { Task } from './Task'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      section: 'Lists',
      lists: []
    }
  }
  handler = (obj)=>{this.setState(obj)}
  render () {
    const section = this.state.section
    const input = this.state.input
    const currentlistid = this.state.currentlistid
    const currentlistname = this.state.currentlistname
    const list = this.state.lists
    const index = this.state.key
    const showDone = this.state.showDone
    let filterTasks = []
    if (section !== 'Lists') {
      for (let eachList of list){
        filterTasks.push(...eachList.tasks)
      }
      const today = new Date().toISOString().slice(0, 10)
      if (section === 'Today') filterTasks = filterTasks.filter(item=>item.duedate === today)
      if (section === 'Scheduled') filterTasks = filterTasks.filter(item=>item.duedate !== '')
    }
    return (
      <div> 
        <NavBar handler={this.handler} section={section} 
          listname={currentlistname} lists={list} 
          input={input} index={index}/>
        {!currentlistid && section === 'Lists' &&
        <div>
        <div className='container'>
          {list.map((_item,_id) => {
            if (_item.display){
              return (
                <List item={_item}
                key={_id}
                lists={list}
                handler={this.handler}
                tasklist={_item.tasks.map(elem=>elem.taskname).join(" \n ")}/>
              )
            }
            return (<div key={_id}/>)
          })}
        </div>
      </div>
      }
      {(section !== 'Lists' || currentlistid) &&
      <div>
        <div className="taskcontainer">
          {currentlistid && list[index].tasks.filter(item =>{
              if (showDone) return !item.done
              return true
            }).map((_item,_id)=>{
            return (
              <Task obj={_item} key={_id}
              lists={list} index={index} handler={this.handler} />
            )
          })}
          {!currentlistid && filterTasks.map((_item,_id)=>{
            return (
              <FilterTask obj={_item} key={_id}
              lists={list} handler={this.handler} />
            )
          })}
        </div>
        <AddTask handler={this.handler} listname={currentlistname} listid={currentlistid} 
          index={index} lists={list}/>
      </div>}
      <DeleteList handler={this.handler} 
        lists={list} listname={currentlistname}
        showDone={showDone} index={index}/>
    </div>
    )
  }
}

export default App
