import { FC } from 'react'
import { Field } from 'react-final-form'
import type { SelectFieldAttrs } from '../../interfaces/selectField'
import FormTextList from '../formInput/FormTextList'
import { useFieldProps } from './hooks'
import SelectOptions from './SelectOptions'

const SelectField: FC<SelectFieldAttrs> = (props) => <>
  <Field {...useFieldProps(props)} className='form-select' component='select'>
    <SelectOptions {...props} />
  </Field>
  <FormTextList {...props} />
</>

export default SelectField
