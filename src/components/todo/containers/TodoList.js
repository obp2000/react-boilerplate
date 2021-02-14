import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import Todo from '../components/Todo'

export default connect(
  state => {return {state}}
  )
  (
  class TodoList extends React.Component {
    constructor(props) {
      super(props);
    };
    static propTypes = {
      todos: PropTypes
        .arrayOf(PropTypes.shape({id: PropTypes.number.isRequired, completed: PropTypes.bool.isRequired, text: PropTypes.string.isRequired}).isRequired)
        .isRequired,
      onTodoClick: PropTypes.func.isRequired
    };
    getVisibleTodos = (todos, filter) => {
      switch (filter) {
        case 'SHOW_COMPLETED':
          return todos.filter(t => t.completed)
        case 'SHOW_ACTIVE':
          return todos.filter(t => !t.completed)
        case 'SHOW_ALL':
        default:
          return todos
      }
    };
    render() {
      return (
        <ul>
          {this
            .getVisibleTodos(this.props.state.todos, this.props.state.visibilityFilter)
            .map(todo => <Todo
              key={todo.id}
              {...todo}
              dispatch={this.props.dispatch}/>)
          }
        </ul>
      )
    }
})
