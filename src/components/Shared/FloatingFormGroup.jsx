import PropTypes from 'prop-types'
import React from 'react'
import { FormGroup } from 'reactstrap'
import Input from './Input'
import Label from './Label'

const FloatingFormGroup = params =>
	<FormGroup floating >
		<Input {...params}/>
		<Label {...{label_size: 'sm', ...params}} />
	</FormGroup>

export default FloatingFormGroup