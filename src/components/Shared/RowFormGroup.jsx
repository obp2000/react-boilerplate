import PropTypes from 'prop-types'
import React from 'react'
import { FormGroup, Col } from 'reactstrap'
import Input from './Input'
import Label from './Label'

const RowFormGroup = params =>
    <FormGroup row>
    	<Label {...{label_col_size: 4, ...params}} />
        <Col>
        	<Input {...params}/>
	    </Col>
    </FormGroup>

export default RowFormGroup

		// <Label for={params.input.name} sm={4}>
  //          	{params.label}
  //       </Label>


// FormGroupComp.propTypes = {
//     label: PropTypes.string,
//     form_text: PropTypes.array,
//     size: PropTypes.number,
// }

		    // <Input
		    //     {...input}
		    //     id={input.name}
		    //     placeholder={label}
		    //     invalid={meta.touched && !!meta.error}
		    //     valid={meta.touched && !meta.error}
		    //     {...rest}
		    // />
	    	// <WidgetErrors {...meta} />
	    	// {form_text && <FormTextList {...{form_text}} />}