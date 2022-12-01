import FormTextList from '@/formInput/FormTextList'
import type { SelectFieldAttrs } from '@/interfaces/selectField'
import { Field } from 'react-final-form'
import { useFieldProps } from './hooks'
import SelectOptions from './SelectOptions'

export default function SelectField(props: SelectFieldAttrs) {
  return <>
    <Field {...useFieldProps(props)} className='form-select' component='select'>
      <SelectOptions {...props} />
    </Field>
    <FormTextList {...props} />
  </>
}
