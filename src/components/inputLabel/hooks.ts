import { useFieldProps, getName } from '../Shared/fieldProps'
import type { AnyFieldAttrs } from '../Shared/fieldProps'

export type LabelAttrs = {
  label?: string
  required?: boolean
  htmlFor: string
  sm: number
  size: string
  check: boolean
}

export const useFieldLabel = (props: AnyFieldAttrs): LabelAttrs => {
  const labelAttrs = useFieldProps(props)
  return {
    label: props.label ?? labelAttrs?.label,
    required: props.required ?? labelAttrs?.required,
    htmlFor: getName(props),
    sm: props.labelColSize,
    size: props.labelSize,
    check: props.check,
  }
}
