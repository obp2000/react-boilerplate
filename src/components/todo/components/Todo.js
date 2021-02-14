import React from 'react'
import PropTypes from 'prop-types'
import {toggleTodo} from '../actions'

export default class Todo extends React.Component {
  constructor(props) {
    super(props);
  };
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    completed: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired
  };
  onClick = () => {
      this
        .props
        .dispatch(toggleTodo(this.props.id))
  }
  render() {
    return (
      <li
        onClick={this.onClick}
        style={{
        textDecoration: this.props.completed
          ? 'line-through'
          : 'none'
      }}>
        {this.props.text}
      </li>
    )
  }
}