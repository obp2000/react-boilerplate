import PropTypes from 'prop-types'
import React from 'react'
import { FormGroup, Col } from 'reactstrap'
import Input from './Input'
import Label from './Label'

const FloatingFormGroup = params =>
	<Col sm={params.size}>
		<FormGroup floating >
			<Input {...params}/>
			<Label {...{label_size: 'sm', ...params}} />
		</FormGroup>
	</Col>

export default FloatingFormGroup


			// <Label for={params.input.name} size='sm'>
		 //      	{params.label}
		 //    </Label>