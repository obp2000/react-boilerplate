import React from 'react'
import { FormGroup } from 'reactstrap'
import Label from '../inputLabel/Label'
import SelectField from './SelectField'
import type { SelectFieldAttrs } from '../../../interfaces/selectField'

const SelectFloatingFormGroup =
  (props: SelectFieldAttrs) => <FormGroup floating >
    <SelectField {...props} />
    <Label {...props} size='sm' />
  </FormGroup>

export default SelectFloatingFormGroup
