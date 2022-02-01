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
