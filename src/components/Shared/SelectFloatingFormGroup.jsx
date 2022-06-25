import React from 'react'
import {FormGroup} from 'reactstrap'
import Label from './Label'
import SelectField from './SelectField'

const SelectFloatingFormGroup = (props) =>
  <FormGroup floating >
    <SelectField {...props} />
    <Label {...props} labelSize='sm' />
  </FormGroup>

export default SelectFloatingFormGroup
