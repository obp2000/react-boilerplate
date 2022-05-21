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
  label_col_size: sm,
  label_size: size,
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
  label_col_size: PropTypes.number,
  label_size: PropTypes.string,
  check: PropTypes.bool,
}

export default LabelComp


// const LabelComp22 = ({
//   input: {
//     name: inputName,
//   } = {},
//   name = inputName,
//   options: {
//     [name]: fieldProps = {},
//   } = {},
//   label = fieldProps.label,
//   required = fieldProps.required,
//   label_col_size: sm,
//   label_size: size,
//   check,
// }) => <Label {...{for: name,
//   sm,
//   size,
//   check}}
// >
//   {label}{required ? '*' : ''}
// </Label>

// LabelComp22.propTypes = {
//   input: PropTypes.object,
//   options: PropTypes.object,
//   name: PropTypes.string,
//   label: PropTypes.string,
//   required: PropTypes.bool,
//   label_col_size: PropTypes.number,
//   label_size: PropTypes.string,
//   check: PropTypes.bool,
// }
