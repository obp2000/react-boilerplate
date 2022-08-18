import PropTypes from 'prop-types'
import React from 'react'
import {Label} from 'reactstrap'
import {useFieldLabel} from './FieldProps'

const emptyObject = {}

const LabelComp = (props) => {
  const {label, required, htmlFor, sm, size, check} = useFieldLabel(props)
  return <Label {...{htmlFor, sm, size, check}}>
    {label}{required && <strong>*</strong>}
  </Label>
}

LabelComp.propTypes = {
  props: PropTypes.object,
  input: PropTypes.object,
  name: PropTypes.string,
  options: PropTypes.object,
  labelColSize: PropTypes.number,
  labelSize: PropTypes.string,
  check: PropTypes.bool,
}

export default LabelComp
