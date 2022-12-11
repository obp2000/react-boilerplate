import type { FieldRenderProps } from 'react-final-form'
import FloatingLabel from '@/client/FloatingLabel'
import Input from './Input'
import { useFieldProps } from './hooks'
import { useFieldProps as useLabelProps } from '@/inputLabel/hooks'

export default function FloatingFormGroup(props: FieldRenderProps<any>) {
  const { id } = useFieldProps(props)
  const { label, required } = useLabelProps(props)
  return <FloatingLabel
    controlId={id}
    label={`${label}${required ? '*' : ''}`}
    className="mb-3"
  >
    <Input {...props} id={undefined} />
  </FloatingLabel>
}


  // return <Form.Group floating >
  //   <Input {...props} />
  //   <Label {...props} size='sm' />
  // </Form.Group>
