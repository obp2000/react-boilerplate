import type { FieldRenderProps } from 'react-final-form'
import Input from './Input'
import Form from '@/client/FormBootstrap'
import Row from '@/client/Row'
import Col from '@/client/Col'
import { useFieldProps } from './hooks'
import { useFieldProps as useLabelProps } from '@/inputLabel/hooks'

export default function RowFormGroup(props: FieldRenderProps<any>) {
  const { id } = useFieldProps(props)
  const { label, required } = useLabelProps(props)
  return <Form.Group as={Row} controlId={id}>
    <Form.Label column sm='4'>
      {`${label}${required ? '*' : ''}`}
    </Form.Label>
    <Col sm='8'>
      <Input {...props} id={undefined} />
    </Col>
  </Form.Group>
}
