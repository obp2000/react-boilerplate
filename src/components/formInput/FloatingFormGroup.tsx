import { FormGroup } from 'reactstrap'
import type { FieldAttrs } from '../../../interfaces/input'
import Label from '../inputLabel/Label'
import Input from './Input'

const FloatingFormGroup = (props: FieldAttrs) =>
  <FormGroup floating >
    <Input {...props} />
    <Label {...props} size='sm' />
  </FormGroup>

export default FloatingFormGroup
