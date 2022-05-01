import React from 'react'
import {FormGroup, Col} from 'reactstrap'
import DropdownList from './DropdownList'
import Label from './Label'

const DropdownListFormGroup = (props) => {
  // console.log('params: ', props)
  return <FormGroup row>
    <Label {...props} />
    <Col>
      <DropdownList {...props} />
    </Col>
  </FormGroup>
}

export default DropdownListFormGroup
