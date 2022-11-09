import { FC } from 'react'
import { FormGroup } from 'reactstrap'
import type { SelectFieldAttrs } from '@/interfaces/selectField'
import Label from '@/inputLabel/Label'
import SelectField from './SelectField'

const SelectFloatingFormGroup: FC<SelectFieldAttrs> =
  (props) => <FormGroup floating >
    <SelectField {...props} />
    <Label {...props} size='sm' />
  </FormGroup>

export default SelectFloatingFormGroup
