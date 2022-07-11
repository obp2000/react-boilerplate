import PropTypes from 'prop-types'
import React from 'react'

const emptyString = ''

const Pindex = ({
  pindex,
  label = emptyString
}) => {
  if (!pindex) {return null}
  return <>{label.substring(0, 3).toLowerCase()}.{pindex}</>
}

Pindex.propTypes = {
	pindex: PropTypes.string,
  label: PropTypes.string,
}

export default Pindex
