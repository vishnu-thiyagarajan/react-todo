import React from 'react'
import './App.css'
import { Button } from './Button'
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
  saveTask = (event) => {
    let temp = this.state.lists
    let key = this.state.key
    var taskid = event.target.parentNode.parentNode.id
    if (!this.state.currentlistid) {
      var [taskid,listid] = taskid.split('|')
      key = temp.findIndex(item => item.id == listid)
    }
    let tkey = temp[key].tasks.findIndex(item => item.id == taskid)
    if (event.target.tagName === 'TEXTAREA') temp[key].tasks[tkey].notes = event.target.value
    if (event.target.tagName === 'SELECT') temp[key].tasks[tkey].priority = event.target.value
    if (event.target.tagName === 'INPUT') temp[key].tasks[tkey].duedate = event.target.value
    this.setState({lists: temp})
  }
  taskDone = (event) => {
    var taskid = event.target.id||event.target.parentNode.id
    let temp = this.state.lists
    let key = this.state.key
    if (!this.state.currentlistid) {
      var [taskid,listid] = taskid.split('|')
      key = temp.findIndex(item => item.id == listid)
    }
    let tkey = temp[key].tasks.findIndex(item => item.id == taskid)
    temp[key].tasks[tkey].done = !temp[key].tasks[tkey].done
    this.setState({lists: temp})
  }
  clearDone = (event) => {
    let temp = this.state.lists
    let key = this.state.key
    if (key) temp[key].tasks = temp[key].tasks.filter(item => !item.done)
    if (this.state.section === 'Today'){
      const today = new Date().toISOString().slice(0, 10)
      for (let key in temp){
        temp[key].tasks = temp[key].tasks.filter(item => !item.done && item.duedate === today)
      }
    }
    if (this.state.section === 'Scheduled'){
      for (let key in temp){
        temp[key].tasks = temp[key].tasks.filter(item => !item.done && item.duedate !== '')
      }
    }
    this.setState({lists: temp})
  }
  deleteTask = (event) => {
    var id = event.target.id||event.target.parentNode.id
    let temp = this.state.lists
    let key = this.state.key
    if (!this.state.currentlistid) {
      var [id,listid] = id.split('|')
      key = temp.findIndex(item => item.id == listid)
    }
    temp[key].tasks = temp[key].tasks.filter(item => item.id != id )
    this.setState({lists: temp})
  }
  addTask = (event) => {
    if (event.key === 'Enter' && event.target.value) {
      let temp = this.state.lists
      let key = this.state.key
      temp[key].tasks = [...temp[key].tasks,{
        id: temp[key].tasks.length ? parseInt(temp[key].tasks[temp[key].tasks.length - 1].id) + 1 : 0,
        taskname: event.target.value,
        listname: this.state.currentlistname,
        listid: this.state.currentlistid,
        notes: '',
        priority: 0,
        duedate: '',
        done: false
      }]
      this.setState({lists: this.state.lists})
      event.target.value = ''
    }
  }
  toggleAddTask = () => this.setState({addTask : !this.state.addTask})
  toggleText = (event) => {
    let temp = this.state.lists
    let key = temp.findIndex(item => item.id == event.target.id)
    temp[key].text = !temp[key].text
    this.setState({lists: temp})
  }
  openList = (event) => {
    let id = event.target.id || event.target.parentNode.id
    let key = this.state.lists.findIndex(item => item.id == id)
    this.setState({
      key:key,
      currentlistid: id,
      currentlistname: this.state.lists[key].listname
    })
  }
  goback = () =>{
    this.setState({
      key: undefined,
      currentlistid: undefined,
      currentlistname: undefined,
      section:'Lists'
    })
  }
  toggleSelect = (event) => {
    let temp = this.state.lists
    let id = event.target.id || event.target.parentNode.id
    let key = temp.findIndex(item => item.id == id)
    temp[key].selected = !temp[key].selected
    this.setState({lists: temp})
  } 
  setListName = (event) => {
    if (event.target.value){
      let temp = this.state.lists
      let key = temp.findIndex(item => item.id == event.target.id)
      temp[key].listname = event.target.value
      this.setState({lists: temp })
    }
  }
  addNewList = (event) => {
    if (event.key === 'Enter' && event.target.value) {
      this.setState({
        lists: [...this.state.lists, {
          id: this.state.lists.length ? parseInt(this.state.lists[this.state.lists.length - 1].id) + 1 : 0,
          listname: event.target.value,
          display: true,
          tasks: []
        }]
      })
      event.target.value = ''
    }
  }
  searchList = (event) => {
    let srchInput = event ? event.target.value : ''
    let temp = this.state.lists
    if (srchInput) temp.forEach((item)=>item.display = item.listname.includes(srchInput) ? true : false)
    if (!srchInput || !this.state.input) temp.forEach((item)=>item.display = true)
    this.setState({lists: temp})
  }
  newListInput = () => {
    this.setState({ input: this.state.input === 'NewList' ? '' : 'NewList' })
  }
  activeLists = (event) => {
    this.setState({ section: event.target.innerText })
  }
  searchInput = () => {
    if (this.state.input === 'Search') this.searchList()
    this.setState({ input: this.state.input === 'Search' ? '' : 'Search' })
  }
  deleteList = () => {
    this.setState({ lists: this.state.lists.filter((item) => !item.selected) })
  }
  toggleDone = () => {
    this.setState({showDone:!this.state.showDone})
  }
  render () {
    const section = this.state.section
    const input = this.state.input
    const currentlistid = this.state.currentlistid
    const currentlistname = this.state.currentlistname
    const list = this.state.lists
    let filterTasks = []
    if (section !== 'Lists') {
      for (let eachList of list){
        filterTasks.push(...eachList.tasks)
      }
      const today = new Date().toISOString().slice(0, 10)
      if (section === 'Today') filterTasks = filterTasks.filter(item=>item.duedate === today)
      if (section === 'Scheduled') filterTasks = filterTasks.filter(item=>item.duedate !== '')
    }
    // for (let list of this.state.lists){
    //   let tasklist = []
    //   for (let task of list){
    //     tasklist.push(task.taskname)
    //   }
    //    tasklist
    // }
    return (
      <div> 
        {!currentlistid && section === 'Lists' &&
        <div>
        <div id='navbar'>
          <Button text='NewList' onclick={this.newListInput} />
          <div id='buttongroup'>
            <Button text='Lists' onclick={this.activeLists} class={section === 'Lists' ? 'active' : ''} />
            <Button text='Today' onclick={this.activeLists} class={section === 'Today' ? 'active' : ''} />
            <Button text='Scheduled' onclick={this.activeLists} class={section === 'Scheduled' ? 'active' : ''} />
          </div>
          <Button text='Search' onclick={this.searchInput} />
          <div id='inputbar'>
            {input === 'NewList' && <input autoFocus type='text' placeholder='List Name...' onKeyUp={this.addNewList} />}
            {input === 'Search' && <input autoFocus type='search' placeholder='Search...' onKeyUp={this.searchList} />}
          </div>
        </div>
        <div className='container'>
          {list.map((_item,_id) => {
            if (_item.display){
              return (
                <List item={_item}
                key={_id}
                tasklist={_item.tasks.map(elem=>elem.taskname).join(" \n ")}
                openList={this.openList}
                toggleText={this.toggleText}
                toggleSelect={this.toggleSelect}
                setListName={this.setListName}/>
              )
            }
            return (<div key={_id}/>)
          })}
        </div>
        <div id='delbar'>
          <Button text='Delete' onclick={this.deleteList} />
        </div>
      </div>
      }
      {(section != 'Lists' || currentlistid) &&
      <div>
        <div id="navbar">
          <Button text='Back' onclick={this.goback} />
          {currentlistname && <p>{currentlistname}</p>}
          {!currentlistname && <div id='buttongroup'>
            <Button text='Lists' onclick={this.activeLists} class={section === 'Lists' ? 'active' : ''} />
            <Button text='Today' onclick={this.activeLists} class={section === 'Today' ? 'active' : ''} />
            <Button text='Scheduled' onclick={this.activeLists} class={section === 'Scheduled' ? 'active' : ''} />
          </div>}
          <Button text='Clear Done' onclick={this.clearDone} />
        </div>
        <div className="taskcontainer">
          {currentlistid && list[this.state.key].tasks.filter(item =>{
              if (this.state.showDone) return !item.done
              return true
            }).map((_item,_id)=>{
            return (
              <Task obj={_item} key={_id} taskDone={this.taskDone}
              saveTask={this.saveTask} deleteTask={this.deleteTask} />
            )
          })}
          {!currentlistid && filterTasks.map((_item,_id)=>{
            return (
              <FilterTask obj={_item} key={_id} taskDone={this.taskDone}
              saveTask={this.saveTask} deleteTask={this.deleteTask} />
            )
          })}
          {currentlistid && !this.state.addTask && <Button text="Add Task" onclick={this.toggleAddTask} />}
          {currentlistid && this.state.addTask && <input autoFocus type='text' placeholder='Task name ...' onBlur={this.toggleAddTask} onKeyUp={this.addTask} />}
        </div>
        <div>
          {currentlistid && list[this.state.key].tasks.filter(item => item.done).length > 0 &&
            <div id='delbar'>
              <Button text='Done' onclick={this.toggleDone} />
            </div>}
        </div>
      </div>}
    </div>
    )
  }
}

export default App
