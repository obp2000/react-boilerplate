import PropTypes from 'prop-types'
import React from 'react'
import { Input } from 'reactstrap'
import WidgetErrors from '../Shared/WidgetErrors'
import FormTextList from '../Shared/FormTextList'

const InputComp = ({
	input,
	meta,
	label,
	size,
	...rest
	}) =>
	<>
		<Input
	        {...input}
		    id={input.name}
			placeholder={rest.label}
			invalid={meta.touched && !!meta.error}
			valid={meta.touched && !meta.error}
			{...rest}
		/>
		{/*{console.log('rest: ', rest)}*/}
		<WidgetErrors {...meta} />
		{rest.form_text && <FormTextList form_text={rest.form_text} />}
	</>

export default InputComp