import React from 'react'
import {FormGroup} from 'reactstrap'
import Input from './Input'
import Label from './Label'

const FloatingFormGroup = (props) =>
  <FormGroup floating >
    <Input {...props} />
    <Label {...props} label_size='sm' />
  </FormGroup>

export default FloatingFormGroup
