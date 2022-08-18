import PropTypes from 'prop-types'
import React from 'react'
import {useName} from './hooks'

const Name = (props) => {
  const {name, label} = useName(props)
  if (!name) {
    return null
  }
  return <>{label}: {name}</>
}

Name.propTypes = {
  props: PropTypes.object,
}

export default Name
