import type { FieldRenderProps } from 'react-final-form'
import { Col, FormGroup } from 'reactstrap'
import Label from '@/inputLabel/Label'
import Input from './Input'

export default function RowFormGroup(props: FieldRenderProps<any>) {
  return <FormGroup row>
    <Label {...props} sm={4} />
    <Col>
      <Input {...props} />
    </Col>
  </FormGroup>
}
