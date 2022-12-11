import type { FieldRenderProps } from 'react-final-form'
import Form from '@/client/FormBootstrap'
import { useFieldProps } from './hooks'
import { useFieldProps as useLabelProps } from '@/inputLabel/hooks'

export default function SwitchFormGroup(props: FieldRenderProps<any>) {
  const { size, ...rest } = useFieldProps(props)
  const { label, required } = useLabelProps(props)
  return <Form.Check
    {...rest}
    type="switch"
    label={`${label}${required ? '*' : ''}`}
  />
}


  // return <FormGroup check className='form-switch'>
  //   <Input {...props} role="switch" />
  //   <Label {...props} />
  // </FormGroup>
