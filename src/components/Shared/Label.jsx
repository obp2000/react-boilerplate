import PropTypes from 'prop-types'
import React from 'react'
import {Label} from 'reactstrap'
import {fieldProps} from './FieldProps'

const LabelComp = ({
  input: {
    name: inputName,
  } = {},
  name = inputName,
  options,
  labelColSize: sm,
  labelSize: size,
  check,
}) => {
  const {label, required} = fieldProps({name}, options)
  return <Label {...{htmlFor: name, sm, size, check}}>
    {label} {required ? '*' : ''}
  </Label>
}

LabelComp.propTypes = {
  input: PropTypes.object,
  name: PropTypes.string,
  options: PropTypes.object,
  labelColSize: PropTypes.number,
  labelSize: PropTypes.string,
  check: PropTypes.bool,
}

export default LabelComp
