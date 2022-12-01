import type { FieldRenderProps } from 'react-final-form'
import { FormGroup } from 'reactstrap'
import Label from '@/inputLabel/Label'
import Input from './Input'

export default function FloatingFormGroup(props: FieldRenderProps<any>) {
  return <FormGroup floating >
    <Input {...props} />
    <Label {...props} size='sm' />
  </FormGroup>
}
