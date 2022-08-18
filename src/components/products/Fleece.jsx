import PropTypes from 'prop-types'
import React from 'react'
import {useFleece} from './hooks'

const Fleece = (props) => {
  const {fleece, label} = useFleece(props)
  if (!fleece) {
    return null
  }
  return <>{label}{' '}</>
}

Fleece.propTypes = {
  props: PropTypes.object,
}

export default Fleece
