import PropTypes from 'prop-types'
import React from 'react'
import {Field} from 'redux-form'
import renderField from '../RenderField'

const TextField = ({name, label, readOnly, normalize}) => <Field
    name={name}
    type="text"
    label={label}
    component={renderField}
    readOnly={readOnly}
    className="form-control"
    normalize={normalize}
/>

TextField.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  readOnly: PropTypes.bool
}

export default TextField