import PropTypes from 'prop-types'
import React from 'react'
import { Field } from 'react-final-form'
import FormTextList from './FormTextList'

const SelectField = ({
	name,
	label,
	options,
        choices,
	dataKey,
	textField,
        read_only,
        ...rest
}) => {
    if (options) {
        const field_options = options[name] || {}
        choices = field_options.choices
        label = field_options.label
        read_only = field_options.read_only
    }
        return <>
        <Field  name={name}
                label={label}
                id={name}
                readOnly={read_only}
                className='form-select'
                aria-label={label}
                component='select'>
            {(choices || []).map((choice, key) =>
                <option value={choice[dataKey] == null ? "" : choice[dataKey]}
                        key={key}>
                    {choice[textField]}
                </option>
            )}
        </Field>
        {rest.form_text && <FormTextList form_text={rest.form_text} />}
    </>
}

SelectField.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    options: PropTypes.object,
    dataKey: PropTypes.string,
    textField: PropTypes.string,
    form_text: PropTypes.string
}

export default SelectField

