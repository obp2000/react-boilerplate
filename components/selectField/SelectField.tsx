import { SelectFieldRenderProps } from '@/interfaces/selectField'
import { OptionHTMLAttributes } from 'react'
import { Field } from 'react-final-form'
import { mapChoices } from './helpers'

export default function SelectField({
  name,
  dataKey,
  textField,
  choices,
  label,
  ...props
}: SelectFieldRenderProps) {
  const selectOptions = mapChoices({ dataKey, textField, choices })
  return <Field {...{ name, id: name, ...props }} component='select'>
    {selectOptions?.map(
      ({
        value,
        label
      }: OptionHTMLAttributes<HTMLSelectElement>, key: number) =>
        <option key={key} {...{ value }}>{label}</option>
    )}
  </Field>
}
