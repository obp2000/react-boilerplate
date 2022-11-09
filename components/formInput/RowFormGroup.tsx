import { FC } from 'react'
import type { FieldRenderProps } from 'react-final-form'
import { Col, FormGroup } from 'reactstrap'
import Label from '@/inputLabel/Label'
import Input from './Input'

const RowFormGroup: FC<FieldRenderProps<any>> = (props) => <FormGroup row>
  <Label {...props} sm={4} />
  <Col>
    <Input {...props} />
  </Col>
</FormGroup>

export default RowFormGroup
