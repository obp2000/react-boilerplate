import { FC } from 'react'
import type { FieldRenderProps } from 'react-final-form'
import { FormGroup } from 'reactstrap'
import Label from '@/inputLabel/Label'
import Input from './Input'

const SwitchFormGroup: FC<FieldRenderProps<any>> =
  (props) => <FormGroup check className='form-switch'>
    <Input {...props} role="switch" />
    <Label {...props} />
  </FormGroup>

export default SwitchFormGroup
