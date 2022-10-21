import { FC } from 'react'
import type { FieldRenderProps } from 'react-final-form'
import { FormGroup } from 'reactstrap'
// import type { FieldAttrs } from '../../../interfaces/input'
import Label from '../inputLabel/Label'
import Input from './Input'

const FloatingFormGroup: FC<FieldRenderProps<any>> =
  (props) => <FormGroup floating >
    <Input {...props} />
    <Label {...props} size='sm' />
  </FormGroup>

export default FloatingFormGroup
