import React from 'react'
import './App.css'
import { Button } from './Button'
import { List } from './List'
// export const lists = []
class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      section: 'Lists',
      lists: []
    }
    this.newListInput = this.newListInput.bind(this)
    this.activeLists = this.activeLists.bind(this)
    this.searchInput = this.searchInput.bind(this)
    this.addNewList = this.addNewList.bind(this)
    this.searchList = this.searchList.bind(this)
  }

  // addItem (e) {
  //   e.preventDefault()
  //   const newItem = this.state.currentItem
  //   if (newItem.text !== '') {
  //     const items = [...this.state.items, newItem]
  //     this.setState({
  //       items: items,
  //       currentItem: {
  //         text: '',
  //         key: ''
  //       }
  //     })
  //   }
  // }

  // handleInput (e) {
  //   this.setState({
  //     currentItem: {
  //       text: e.target.value,
  //       key: Date.now()
  //     }
  //   })
  // }

  // deleteItem (key) {
  //   const filteredItems = this.state.items.filter(item =>
  //     item.key !== key)
  //   this.setState({
  //     items: filteredItems
  //   })
  // }

  // setUpdate (text, key) {
  //   console.log('items:' + this.state.items)
  //   const items = this.state.items
  //   items.map(item => {
  //     if (item.key === key) {
  //       console.log(item.key + '    ' + key)
  //       item.text = text
  //     }
  //   })
  //   this.setState({
  //     items: items
  //   })
  // }
  addNewList (event) {
    if (event.key === 'Enter' && event.target.value) {
      this.setState({
        lists: [...this.state.lists, {
          id: this.state.lists.length ? parseInt(this.state.lists[this.state.lists.length - 1].id) + 1 : 0,
          listname: event.target.value,
          selected: false,
          done: false,
          tasks: []
        }]
      })
      event.target.value = ''
    }
  }

  searchList () {
    console.log('s')
  }

  newListInput () {
    this.setState({ input: this.state.input === 'NewList' ? '' : 'NewList' })
  }

  activeLists (event) {
    this.setState({ section: event.target.innerText })
  }

  searchInput () {
    this.setState({ input: this.state.input === 'Search' ? '' : 'Search' })
  }

  render () {
    const section = this.state.section
    const input = this.state.input
    return (
      <div>
        <div id='navbar'>
          <Button text='NewList' onclick={this.newListInput} />
          <div id='buttongroup'>
            <Button text='Lists' onclick={this.activeLists} class={section === 'Lists' ? 'active' : ''} />
            <Button text='Today' onclick={this.activeLists} class={section === 'Today' ? 'active' : ''} />
            <Button text='Scheduled' onclick={this.activeLists} class={section === 'Scheduled' ? 'active' : ''} />
          </div>
          <Button text='Search' onclick={this.searchInput} />
        </div>
        <div id='inputbar'>
          {input === 'NewList' && <input autoFocus type='text' placeholder='List Name...' onKeyUp={this.addNewList} />}
          {input === 'Search' && <input autoFocus type='search' placeholder='Search...' onKeyUp={this.searchList} />}
        </div>
        {this.state.lists.map((item) => {
          return (
            <List obj={item} key={item.id} />
          )
        })}
      </div>
    )
  }
}

export default App
