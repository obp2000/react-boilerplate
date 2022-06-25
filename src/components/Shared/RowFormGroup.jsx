import React from 'react'
import {FormGroup, Col} from 'reactstrap'
import Input from './Input'
import Label from './Label'

const RowFormGroup = (props) =>
  <FormGroup row>
    <Label {...props} labelColSize={4} />
    <Col>
      <Input {...props}/>
    </Col>
  </FormGroup>

export default RowFormGroup
