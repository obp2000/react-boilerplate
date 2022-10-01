import React from 'react'
import { FormGroup, Col } from 'reactstrap'
import DropdownList from './DropdownList'
import Label from '../inputLabel/Label'
import type { DropdownListAttrs } from '../../../interfaces'

const DropdownListFormGroup = (
  props: DropdownListAttrs
): JSX.Element => <FormGroup row>
    <Label {...props} labelColSize={2} />
    <Col>
      <DropdownList {...props} />
    </Col>
  </FormGroup>

export default DropdownListFormGroup
