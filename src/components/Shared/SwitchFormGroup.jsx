import PropTypes from 'prop-types'
import React from 'react'
import { FormGroup } from 'reactstrap'
import Input from './Input'
import Label from './Label'

const SwitchFormGroup = props =>
	<FormGroup check className='form-switch'>
		<Input {...props} type="checkbox" role="switch" />
		<Label {...props} check={true} />
	</FormGroup>

export default SwitchFormGroup