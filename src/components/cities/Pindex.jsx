import PropTypes from 'prop-types'
import React from 'react'
import {usePindex} from './hooks'

const Pindex = (props) => {
  const {pindex, label} = usePindex(props)
  if (!pindex) {
    return null
  }
  return <>{label}.{pindex}</>
}

Pindex.propTypes = {
  props: PropTypes.object,
}

export default Pindex
