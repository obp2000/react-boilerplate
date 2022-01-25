import PropTypes from 'prop-types'
import React from 'react'
import { Input } from 'reactstrap'
import WidgetErrors from '../Shared/WidgetErrors'
import FormTextList from '../Shared/FormTextList'

const ImageInputComp = ({
	input,
	meta,
	...rest
	}) =>
	<>
		<Input
	        type="file"
	        accept='.jpg, .png, .jpeg'
		    id={input.name}
			placeholder={rest.label}
			onChange={e => input.onChange(e.target.files[0])}
			invalid={meta.touched && !!meta.error}
			valid={meta.touched && !meta.error}
			{...rest}
		/>
		<WidgetErrors {...meta} />
		{rest.form_text && <FormTextList form_text={rest.form_text} />}
	</>

export default ImageInputComp