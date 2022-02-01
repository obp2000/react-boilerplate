import PropTypes from 'prop-types'
import React from 'react'
import { Input } from 'reactstrap'
import WidgetErrors from './WidgetErrors'
import FormTextList from './FormTextList'
import { invalid, valid } from './FieldStatus'

const InputComp = ({
	input,
	meta,
	label,
	size,
	form_text,
	...rest
	}) =>
	<>
		<Input
	        {...input}
		    id={input.name}
			placeholder={label}
			invalid={invalid(meta)}
			valid={valid(meta)}
			{...rest}
		/>
		<WidgetErrors {...meta} />
		{form_text && <FormTextList form_text={form_text} />}
	</>

export default InputComp