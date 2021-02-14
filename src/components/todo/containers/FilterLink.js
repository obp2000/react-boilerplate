import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setVisibilityFilter } from '../actions'

export default connect(
  state => {return {state}}
)(
  class Link extends React.Component {
    constructor(props) {
      super(props);
    };
    static propTypes = {
      active: PropTypes.bool.isRequired,
      children: PropTypes.node.isRequired,
      onClick: PropTypes.func.isRequired
    }
    onClick = (e) => {
      e.preventDefault()
      this
        .props
        .dispatch(setVisibilityFilter(this.props.filter))
    }
    render() {
      return (this.props.filter === this.props.state.visibilityFilter
        ? <span>{this.props.children}</span>
        : <a href="" onClick={this.onClick}>
          {this.props.children}
        </a>)
    }
})
