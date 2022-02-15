import PropTypes from 'prop-types'
import React from 'react'
import { Input } from 'reactstrap'
import WidgetErrors from './WidgetErrors'
import FormTextList from './FormTextList'
import { invalid, valid } from './FieldStatus'

const InputComp = ({
    input,
    meta,
    options,
    ...rest
}) => {
    let field = {}
    if (options) {
    	const field_options = options[input.name] || {}
        field = { ...field_options,
            	  readOnly: field_options.read_only,
            	  placeholder: field_options.label
        		}
    } else {
        field = { placeholder: rest.label }
    }
    return <>
        <Input
	        {...input}
	        {...field}
		    id={input.name}
			invalid={invalid(meta)}
			valid={valid(meta)}
			{...rest}
		/>
		<WidgetErrors { ...meta } />
		{rest.form_text && <FormTextList form_text={rest.form_text} />}
    </>
}

export default InputComp