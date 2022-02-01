import PropTypes from 'prop-types'
import React from 'react'
import { FormGroup } from 'reactstrap'
import Input from './Input'
import Label from './Label'

const SwitchFormGroup = params =>
	<FormGroup check className='form-switch'>
		<Input {...{role: "switch", ...params}} />
		<Label {...{check: true, ...params}} />
	</FormGroup>

export default SwitchFormGroup