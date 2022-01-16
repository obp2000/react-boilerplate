import PropTypes from 'prop-types'
import React from 'react'
// import {Field} from 'redux-form'
import { Field } from 'react-final-form'
import renderField from '../RenderField'

const PasswordField = ({name, label, readOnly, required}) => <Field
    name={name}
    type="password"
    component={renderField}
    required={required}
    className="validate"
/>

PasswordField.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  readOnly: PropTypes.bool
}

export default PasswordField