import React from 'react'
import { FormGroup } from 'reactstrap'
import Label from '../inputLabel/Label'
import SelectField from './SelectField'
import type { SelectFieldAttrs } from './hooks'

const SelectFloatingFormGroup =
  (props: SelectFieldAttrs): JSX.Element => <FormGroup floating >
    <SelectField {...props} />
    <Label {...props} labelSize='sm' />
  </FormGroup>

export default SelectFloatingFormGroup
