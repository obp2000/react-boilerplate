import PropTypes from 'prop-types'
import React from 'react'
// import {Field} from 'redux-form'
import { Field } from 'react-final-form'
// import { Field } from 'react-final-form'
import renderField from '../RenderField'

const TextField = ({name, label, readOnly}) => <Field
    name={name}
    type="search"
    label={label}
    component={renderField}
    readOnly={readOnly}
    className="form-control"
/>

TextField.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  readOnly: PropTypes.bool
}

export default TextField