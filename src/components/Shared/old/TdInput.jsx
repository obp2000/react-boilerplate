import PropTypes from 'prop-types'
import React from 'react'
import Input from './Input'

const TdInput = (params) =>
  <td colSpan={params.colSpan}>
    	<Input {...params}/>
  </td>

TdInput.propTypes = {
  label: PropTypes.string,
  formText: PropTypes.array,
  size: PropTypes.number,
  colSpan: PropTypes.number,
}

export default TdInput
