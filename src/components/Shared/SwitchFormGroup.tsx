import { FormGroup } from 'reactstrap'
import Input from './Input'
import Label from '../inputLabel/Label'
import type { AnyFieldAttrs } from './FieldProps'

const SwitchFormGroup = (props: AnyFieldAttrs) =>
  <FormGroup check className='form-switch'>
    <Input {...props} type="checkbox" role="switch" />
    <Label {...props} check={true} />
  </FormGroup>

export default SwitchFormGroup
