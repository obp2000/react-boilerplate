import PropTypes from 'prop-types'
import React from 'react'

const emptyString = ''

const Name = ({
  name,
  label = emptyString
}) => {
  if (!name) {return null}
  return <>{label}: {name}</>
}

Name.propTypes = {
	name: PropTypes.string,
  label: PropTypes.string,
}

export default Name
