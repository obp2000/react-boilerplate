import { Col, FormGroup } from 'reactstrap'
import type { FieldAttrs } from '../../../interfaces/input'
import Label from '../inputLabel/Label'
import Input from './Input'

const RowFormGroup = (props: FieldAttrs) =>
  <FormGroup row>
    <Label {...props} sm={4} />
    <Col>
      <Input {...props} />
    </Col>
  </FormGroup>

export default RowFormGroup
