import PropTypes from 'prop-types'
import React from 'react'
import { FormGroup } from 'reactstrap'
import Input from './Input'
import Label from './Label'

const SwitchFormGroup = params =>
	<FormGroup check className='form-switch'>
		<Input {...params} type="checkbox" role="switch" />
		<Label {...params} check={true} />
	</FormGroup>

export default SwitchFormGroup