import PropTypes from 'prop-types'
import React from 'react'
import { Input } from 'reactstrap'
import WidgetErrors from './WidgetErrors'
import FormTextList from './FormTextList'
import { invalid, valid } from './FieldStatus'

const InputComp = ({
    input: {
        name: input_name,
        ...input
    } = {},
    name = input_name,
    id = name,
    options: {
        [name]: field_props = {}
    } = {},
    label: placeholder = field_props.label,
    required = field_props.required,
    readOnly = field_props.read_only,
    min = field_props.min_value,
    max = field_props.max_value,
    form_text = field_props.help_text,
    meta,
    ...rest
}) => <>
        <Input
            {...input}
            {...{name,
                id,
                placeholder,
                required,
                readOnly,
                min,
                max}}
            checked={rest.type == 'checkbox' && input.value ? true : false}
            invalid={invalid(meta)}
            valid={valid(meta)}
            {...rest}
        />
        <WidgetErrors { ...meta }/>
        {form_text && <FormTextList form_text={form_text} />}
    </>

export default InputComp
