import { FormGroup } from 'reactstrap'
import type { FieldAttrs } from '../../../interfaces/input'
import Label from '../inputLabel/Label'
import Input from './Input'

const SwitchFormGroup = (props: FieldAttrs) =>
  <FormGroup check className='form-switch'>
    <Input {...props} role="switch" />
    <Label {...props} />
  </FormGroup>

export default SwitchFormGroup
