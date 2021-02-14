import PropTypes from 'prop-types'
import React from 'react'
import {Field} from 'redux-form'
import renderField from '../RenderField'

const NumberField = ({name, 
                      label, 
                      readOnly, 
                      parse, 
                      defaultValue, 
                      format, 
                      normalize}) => <Field
    name={name}
    type="number"
    label={label}
    component={renderField}
    readOnly={readOnly}
    className="form-control"
    parse={value => parseInt(value)}
    defaultValue={defaultValue}
    format={format}
    normalize={normalize}
/>

NumberField.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  readOnly: PropTypes.bool
}

export default NumberField