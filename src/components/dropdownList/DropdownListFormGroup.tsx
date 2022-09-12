import { FormGroup, Col } from 'reactstrap'
import DropdownList from './DropdownList'
import Label from '../inputLabel/Label'
import type { DropdownListProps } from './hooks'

const DropdownListFormGroup = (props: DropdownListProps) => <FormGroup row>
  <Label {...props} labelColSize={2} />
  <Col>
    <DropdownList {...props} />
  </Col>
</FormGroup>

export default DropdownListFormGroup
