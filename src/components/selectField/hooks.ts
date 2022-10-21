import type { FieldProps } from 'react-final-form'
import type { AnyChoices, AnyChoicesType } from '../../../interfaces/options'
import type {
  SelectFieldAttrs, SelectOptions
} from '../../../interfaces/selectField'
import { useMapFieldProps } from '../options/hooks'

export const mapChoices = ({
  choices = [],
  dataKey,
  textField,
}: AnyChoicesType & Partial<SelectFieldAttrs>): SelectOptions[] =>
  choices.map(({
    [dataKey as keyof AnyChoices]: value,
    [textField as keyof AnyChoices]: label }) =>
    ({ value: value ?? '', label }))

export const useFieldProps = ({
  dataKey,
  textField,
  ...props
}: SelectFieldAttrs): FieldProps<any, any> => {
  let {
    selectOptions,
    helpText,
    ...result
  } = useMapFieldProps({ dataKey, textField, ...props })
  return {
    ...result,
    ...props,
  }
}