import { FormGroup } from 'reactstrap'
import type { SelectFieldAttrs } from '@/interfaces/selectField'
import Label from '@/inputLabel/Label'
import SelectField from './SelectField'

export default function SelectFloatingFormGroup(props: SelectFieldAttrs) {
  return <FormGroup floating >
    <SelectField {...props} />
    <Label {...props} size='sm' />
  </FormGroup>
}
