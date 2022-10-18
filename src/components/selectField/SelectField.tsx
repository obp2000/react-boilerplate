import React from 'react'
import { Field } from 'react-final-form'
import SelectOptions from './SelectOptions'
import FormTextList from '../formInput/FormTextList'
import { useFieldProps } from './hooks'
import type {
  SelectFieldAttrs,
  // SelectOptions
} from '../../../interfaces/selectField'

const SelectField = (props: SelectFieldAttrs) => {
  // const { selectOptions, ...fieldAttrs } = useFieldProps(props)
  return <>
    <Field {...useFieldProps(props)} className='form-select' component='select'>
      <SelectOptions {...props} />
{/*      {selectOptions?.map(({ value, label }: SelectOptions, key: number) =>
        <option key={key} {...{ value }}>{label}</option>
      )}*/}
    </Field>
    <FormTextList {...props} />
  </>
}

export default SelectField
