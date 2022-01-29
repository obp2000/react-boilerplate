import PropTypes from 'prop-types'
import React from 'react'
import { FormGroup } from 'reactstrap'
import ImageInput from '../Shared/ImageInput'
import Label from './Label'

const ImageFormGroup = params =>
	<FormGroup floating>
		<ImageInput {...params}/>
		<Label {...params} />
	</FormGroup>

export default ImageFormGroup