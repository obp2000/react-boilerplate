import React from 'react'
import { FormGroup, Col } from 'reactstrap'
import Input from '../formInput/Input'
import Label from '../inputLabel/Label'
import type { AnyFieldAttrs } from '../Shared/fieldProps'

const RowFormGroup = (props: AnyFieldAttrs) =>
  <FormGroup row>
    <Label {...props} labelColSize={4} />
    <Col>
      <Input {...props} />
    </Col>
  </FormGroup>

export default RowFormGroup
