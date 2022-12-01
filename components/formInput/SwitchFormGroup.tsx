import type { FieldRenderProps } from 'react-final-form'
import { FormGroup } from 'reactstrap'
import Label from '@/inputLabel/Label'
import Input from './Input'

export default function SwitchFormGroup(props: FieldRenderProps<any>) {
  return <FormGroup check className='form-switch'>
    <Input {...props} role="switch" />
    <Label {...props} />
  </FormGroup>
}
