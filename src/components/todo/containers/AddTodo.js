import React from 'react'
import {connect} from 'react-redux'
import {addTodo} from '../actions/index'

export default connect()(class AddTodo extends React.Component {
  constructor(props) {
    super(props);
  };
  onSubmit = (e) => {
    e.preventDefault()
    if (!this.input.value.trim()) {
      return
    }
    this
      .props
      .dispatch(addTodo(this.input.value))
    this.input.value = ''
  }
  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input ref={node => {
            this.input = node
          }}/>
          <button type="submit">
            Add Todo
          </button>
        </form>
      </div>
    )
  }
})