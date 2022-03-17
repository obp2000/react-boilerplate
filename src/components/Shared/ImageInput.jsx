import PropTypes from 'prop-types'
import React from 'react'
import { Input } from 'reactstrap'
import WidgetErrors from '../Shared/WidgetErrors'
import FormTextList from '../Shared/FormTextList'

const ImageInputComp = ({
    input: {
        name: input_name,
        onChange,
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
    form_text = field_props.help_text,
    meta,
    ...rest
}) => <>
		<Input
	        type="file"
	        accept='.jpg, .png, .jpeg'
            {...{name,
                id,
                placeholder,
                required,
                readOnly,
			}}
			onChange={e => onChange(e.target.files[0])}
			invalid={meta.touched && !!meta.error}
			valid={meta.touched && !meta.error}
			{...rest}
		/>
		<WidgetErrors {...meta} />
		{form_text && <FormTextList form_text={form_text} />}
	</>






const ImageInputComp111 = ({
	input,
	meta,
	label: placeholder,
	options,
	...rest
	}) => {
    let field = {}
    if (field = options[input.name]) {
        renameKey(field, 'read_only', 'readOnly')
        delete field.type
    }
	return <>
		<Input
	        type="file"
	        accept='.jpg, .png, .jpeg'
		    id={input.name}
		    placeholder={placeholder}
			onChange={e => input.onChange(e.target.files[0])}
			invalid={meta.touched && !!meta.error}
			valid={meta.touched && !meta.error}
			{...rest}
			{...field}
		/>
		<WidgetErrors {...meta} />
		{rest.form_text && <FormTextList form_text={rest.form_text} />}
	</>
}

export default ImageInputComp