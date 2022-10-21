import { FC } from 'react'
import { Col, FormGroup } from 'reactstrap'
import type { DropdownListAttrs } from '../../../interfaces/dropdownList'
import Label from '../inputLabel/Label'
import DropdownList from './DropdownList'

const DropdownListFormGroup: FC<DropdownListAttrs> = (props) => <FormGroup row>
  <Label {...props} sm={2} />
  <Col>
    <DropdownList {...props} />
  </Col>
</FormGroup>

export default DropdownListFormGroup
