import PropTypes from 'prop-types'
import React from 'react'
import { FormGroup, Col } from 'reactstrap'
import ImageInput from '../Shared/ImageInput'
import Label from './Label'

const ImageFormGroup = params =>
    <Col sm={params.size}>
		<FormGroup floating>
			<ImageInput {...params}/>
			<Label {...params} />
		</FormGroup>
    </Col>

export default ImageFormGroup

		        // <Label for={params.input.name} >
		      		// {params.label}
		       	// </Label>


	        // <Input
	        //    type="file"
	        //    accept='.jpg, .png, .jpeg'
	        //    id={input.name}
	        //    placeholder={label}
	        //    onChange={e => input.onChange(e.target.files[0])}
	        //    // invalid={meta.touched && !!meta.error}
	        //    // valid={meta.touched && !meta.error}
	        //    {...rest}
	        // />
	       	// <WidgetErrors {...meta} />