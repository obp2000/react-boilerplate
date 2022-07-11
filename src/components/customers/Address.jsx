import PropTypes from 'prop-types'
import React from 'react'

const emptyString = ''

const Address = ({
  address,
  label = emptyString
}) => {
  if (!address) {return null}
  return <>{label}: {address}</>
}

Address.propTypes = {
  address: PropTypes.string,
  label: PropTypes.string,
}

export default Address
