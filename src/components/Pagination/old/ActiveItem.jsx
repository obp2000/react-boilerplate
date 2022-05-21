import PropTypes from 'prop-types'
import React from 'react'

const ActiveItem = ({className, children}) =>
  <span className={className}>
    {children}
  </span>

export default ActiveItem
