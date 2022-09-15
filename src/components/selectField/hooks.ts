import { getFieldOptions } from '../Shared/fieldProps'
import type { AllOptions, HtmlAttrs, AllChoices } from '../Shared/fieldProps'

export type SelectFieldAttrs = {
  name: string
  dataKey: string
  textField: string
  options?: AllOptions
  label?: string
  helpText?: string
  required?: boolean
  readOnly?: boolean
}

export const useSelectFieldAttrs = (fieldAttrs: SelectFieldAttrs) => {
  const name = fieldAttrs.name
  const props = getFieldOptions(fieldAttrs.options, name)
  const label = fieldAttrs.label ?? props?.label
  const helpText = fieldAttrs.helpText ?? props?.help_text
  let attrs: HtmlAttrs = {
    name,
    id: name,
    required: fieldAttrs.required ?? props?.required,
    readOnly: fieldAttrs.readOnly ?? props?.read_only,
    label,
    placeholder: label,
    'aria-label': label,
  }
  attrs.choices = props?.choices
  if (helpText) {
    attrs.helpText = helpText
  }
  return attrs
}

export const useSelectField = (props: SelectFieldAttrs) => {
  const { choices, label, helpText, ...fieldAttrs } = useSelectFieldAttrs(props)
  const { options, dataKey, textField, ...rest } = props
  const selectOptions = choices?.map(
    ({ [dataKey as keyof AllChoices]: value,
      [textField as keyof AllChoices]: label }) =>
      ({ value: value ?? '', label }))
  return {
    fieldAttrs: { ...fieldAttrs, ...rest },
    selectOptions,
    helpText,
  }
}
