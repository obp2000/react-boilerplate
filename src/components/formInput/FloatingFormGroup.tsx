import React from 'react'
import { FormGroup } from 'reactstrap'
import Input from '../formInput/Input'
import Label from '../inputLabel/Label'
import type { AnyFieldAttrs } from '../../../interfaces'

const FloatingFormGroup = (props: AnyFieldAttrs) =>
  <FormGroup floating >
    <Input {...props} />
    <Label {...props} labelSize='sm' />
  </FormGroup>

export default FloatingFormGroup
