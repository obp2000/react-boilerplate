import type { LabelProps } from 'reactstrap'
import type { FieldAttrs } from './input'
import type { SelectFieldAttrs } from './selectField'
import type { DropdownListAttrs } from './dropdownList'

export type FieldLabel = {
  label?: string
}

export type LabelSizes = Pick<LabelProps, 'sm' | 'size'>

export type LabelAttrs = FieldLabel & LabelSizes & {
  // label?: string
  required?: boolean
  htmlFor?: string
  // sm: number
  // size: string
  // check: boolean
}

export type AnyFieldAttrs = FieldAttrs & SelectFieldAttrs & DropdownListAttrs
