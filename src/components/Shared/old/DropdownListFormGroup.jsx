import React from 'react'
import {FormGroup, Col} from 'reactstrap'
import DropdownList from './DropdownList'
import Label from './Label'

const DropdownListFormGroup = (props) => {
  return <FormGroup row>
    <Label {...props} labelColSize={2} />
    <Col>
      <DropdownList {...props} />
    </Col>
  </FormGroup>
}

export default DropdownListFormGroup
