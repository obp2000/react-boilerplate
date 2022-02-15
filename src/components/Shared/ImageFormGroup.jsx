import PropTypes from 'prop-types'
import React from 'react'
import { FormGroup } from 'reactstrap'
import ImageInput from '../Shared/ImageInput'
import Label from './Label'

const ImageFormGroup = props =>
	<FormGroup floating>
		<ImageInput {...props} />
		<Label {...props} />
	</FormGroup>

export default ImageFormGroup