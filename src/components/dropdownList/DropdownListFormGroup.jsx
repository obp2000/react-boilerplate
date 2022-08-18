import React from 'react'
import {FormGroup, Col} from 'reactstrap'
import DropdownList from './DropdownList'
import Label from '../Shared/Label'

const DropdownListFormGroup = (props) => <FormGroup row>
  <Label {...props} labelColSize={2} />
  <Col>
    <DropdownList {...props} />
  </Col>
</FormGroup>

export default DropdownListFormGroup
