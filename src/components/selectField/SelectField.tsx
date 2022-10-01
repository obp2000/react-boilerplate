import React from 'react'
import { Field } from 'react-final-form'
import FormTextList from '../Shared/FormTextList'
import { useSelectField } from './hooks'
import type { SelectFieldAttrs } from '../../../interfaces'

const SelectField = (props: SelectFieldAttrs) => {
  const { fieldAttrs, selectOptions, helpText } = useSelectField(props)
  return <>
    <Field {...fieldAttrs} className='form-select' component='select'>
      {selectOptions?.map(({ value, label }, key) =>
        <option key={key} {...{ value }}>{label}</option>
      )}
    </Field>
    <FormTextList formText={helpText} />
  </>
}

export default SelectField
