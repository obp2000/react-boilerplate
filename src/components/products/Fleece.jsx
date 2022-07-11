import PropTypes from 'prop-types'
import React from 'react'

const emptyString = ''

const Fleece = ({
  fleece,
  label = emptyString
}) => {
  if (!fleece) {return null}
  return <>{label.toLowerCase()}{' '}</>
}

Fleece.propTypes = {
  fleece: PropTypes.bool,
  label: PropTypes.string,
}

export default Fleece
