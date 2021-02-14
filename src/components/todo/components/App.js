import React from 'react'
import Footer from './Footer'
import AddTodo from '../containers/AddTodo'
import TodoList from '../containers/TodoList'

// const App = () => (   <div>     <AddTodo />     <VisibleTodoList />
// <Footer />   </div> ) export default App

export default class App extends React.Component {
  render() {
    return (
      <div>
        <AddTodo/>
        <TodoList/>
        <Footer/>
      </div>
    )
  }
}