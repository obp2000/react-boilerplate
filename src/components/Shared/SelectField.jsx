import PropTypes from 'prop-types'
import React from 'react'
import { Field } from 'react-final-form'
import FormTextList from './FormTextList'

const SelectField = ({
    name,
    id = name,
    options: {
        [name]: field_props = {}
    } = {},
    label: placeholder = field_props.label,
    required = field_props.required,
    readOnly = field_props.read_only,
    choices = field_props.choices || [],
    dataKey,
    textField,
    form_text = field_props.help_text,
    ...rest
}) => {
    return <>
        <Field
            {...{name,
                id,
                placeholder,
                'aria-label': placeholder,
                required,
                readOnly,
                className: 'form-select',
                component: 'select'
            }}
            {...rest}
        >
            {choices.map((choice, key) =>
                <option value={choice[dataKey] == null ? "" : choice[dataKey]}
                        key={key}>
                    {choice[textField]}
                </option>
            )}
        </Field>
        {form_text && <FormTextList form_text={form_text} />}
    </>
}

SelectField.propTypes = {
    name: PropTypes.string,
    id: PropTypes.number,
    options: PropTypes.object,
    label: PropTypes.string,
    required: PropTypes.bool,
    readOnly: PropTypes.bool,
    choices: PropTypes.array,
    dataKey: PropTypes.string,
    textField: PropTypes.string,
    form_text: PropTypes.string
}

export default SelectField

