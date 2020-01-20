import React from 'react'
import './App.css'
import { Button } from './Button'
import { List } from './List'
import { Task } from './Task'
class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      section: 'Lists',
      lists: []
    }
    this.addNewList = this.addNewList.bind(this)
  }
  taskDone = (event) => {
    let temp = this.state.lists
    let key = this.state.key
    let taskid = event.target.id||event.target.parentNode.id
    let tkey = temp[key].tasks.findIndex(item => item.id == taskid)
    temp[key].tasks[tkey].done = !temp[key].tasks[tkey].done
    this.setState({lists: temp})
  }
  addTask = (event) => {
    if (event.key === 'Enter' && event.target.value) {
      let temp = this.state.lists
      let key = this.state.key
      temp[key].tasks = [...temp[key].tasks,{
        id: temp[key].tasks.length ? parseInt(temp[key].tasks[temp[key].tasks.length - 1].id) + 1 : 0,
        taskname: event.target.value,
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
      currentlistname: this.state.lists[key].listname})
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
  addNewList (event) {
    if (event.key === 'Enter' && event.target.value) {
      this.setState({
        lists: [...this.state.lists, {
          id: this.state.lists.length ? parseInt(this.state.lists[this.state.lists.length - 1].id) + 1 : 0,
          listname: event.target.value,
          done: false,
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
  render () {
    const section = this.state.section
    const input = this.state.input
    const currentlistid = this.state.currentlistid
    return (
      <div> 
        {!currentlistid &&
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
          {this.state.lists.map((_item,_id) => {
            if (_item.display){
              return (
                <List item={_item}
                key={_id}
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
      {currentlistid &&
      <div>
      <div id="navbar">
        <Button text='Back' onclick={this.goback} />
        <p>{this.state.currentlistname}</p>
        <Button text='Clear Done' onclick={this.clearDone} />
      </div>
      <div className="taskcontainer">
        {this.state.lists[this.state.key].tasks.map((_item,_id)=>{
          return (
            <Task obj={_item} key={_id} taskDone={this.taskDone} />
          )
        })}
        {!this.state.addTask && <Button text="Add Task" onclick={this.toggleAddTask} />}
        {this.state.addTask && <input autoFocus type='text' onBlur={this.toggleAddTask} onKeyUp={this.addTask} />}
      </div>
      </div>
      }
      </div>
    )
  }
}

export default App
