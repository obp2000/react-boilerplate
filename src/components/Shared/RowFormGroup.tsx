import {FormGroup, Col} from 'reactstrap'
import Input from './Input'
import Label from '../inputLabel/Label'
import type { AnyFieldAttrs } from './FieldProps'

const RowFormGroup = (props: AnyFieldAttrs) =>
  <FormGroup row>
    <Label {...props} labelColSize={4} />
    <Col>
      <Input {...props}/>
    </Col>
  </FormGroup>

export default RowFormGroup
