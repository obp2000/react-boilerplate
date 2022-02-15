import PropTypes from 'prop-types'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Field } from 'react-final-form'

const InputField = ({ name, field, component }) => {

	return  <Field  name={name}
                    label={field.label}
                    required={field.required}
                    component={component} />
}

export default InputField
