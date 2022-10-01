import {
  AnyOptions,
  FieldPropsWithChoices,
  FieldAttrs,
} from '../../../interfaces'

export const getName = (props: FieldAttrs) => props.name ?? props.input?.name

export const getFieldOptions =
  (options: AnyOptions | undefined, name: string) => {
    if (options && name) {
      const nameMod = name.split('.').pop() as keyof AnyOptions
      return options[nameMod] as FieldPropsWithChoices
    }
  }

export const useFieldProps = (fieldAttrs: FieldAttrs) => {
  const name = getName(fieldAttrs)
  return getFieldOptions(fieldAttrs.options, name)
}
