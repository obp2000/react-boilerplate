import { Col, FormGroup } from 'reactstrap'
import type { DropdownListAttrs } from '../../../interfaces/dropdownList'
import Label from '../inputLabel/Label'
import DropdownList from './DropdownList'

const DropdownListFormGroup = (props: DropdownListAttrs) => <FormGroup row>
    <Label {...props} sm={2} />
    <Col>
      <DropdownList {...props} />
    </Col>
  </FormGroup>

export default DropdownListFormGroup
