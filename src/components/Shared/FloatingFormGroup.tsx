import { FormGroup } from 'reactstrap'
import Input from './Input'
import Label from '../inputLabel/Label'
import type { AnyFieldAttrs } from './FieldProps'

const FloatingFormGroup = (props: AnyFieldAttrs) =>
  <FormGroup floating >
    <Input {...props} />
    <Label {...props} labelSize='sm' />
  </FormGroup>

export default FloatingFormGroup
