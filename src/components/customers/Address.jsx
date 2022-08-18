import PropTypes from 'prop-types'
import React from 'react'
import {useAddress} from './hooks'

const Address = (props) => {
  const {address, label} = useAddress(props)
  if (!address) {
    return null
  }
  return <>{label}: {address}</>
}

Address.propTypes = {
  props: PropTypes.object,
}

export default Address
