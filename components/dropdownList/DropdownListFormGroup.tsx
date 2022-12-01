'use client'

import { Col, FormGroup } from 'reactstrap'
import type { DropdownListAttrs } from '@/interfaces/dropdownList'
import Label from '@/inputLabel/Label'
import DropdownList from './DropdownList'

export default function DropdownListFormGroup(props: DropdownListAttrs) {
  return <FormGroup row>
    <Label {...props} sm={2} />
    <Col>
      <DropdownList {...props} />
    </Col>
  </FormGroup>
}
