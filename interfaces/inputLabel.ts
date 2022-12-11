import type { FieldAttrs } from './input'
import type { SelectFieldAttrs } from './selectField'
import type { DropdownListAttrs } from './dropdownList'

export type ColumnProps =
  | string
  | boolean
  | number
  | {
      size?: boolean | number | string;
      offset?: string | number;
      order?: string | number;
    }

export type FieldLabel = {
  label?: string
}

export type LabelSizes = {
  size?: string
  sm?: ColumnProps
}

export type LabelAttrs = FieldLabel & LabelSizes & {
  // label?: string
  required?: boolean
  htmlFor?: string
  // sm: number
  // size: string
  // check: boolean
}

export type AnyFieldAttrs = FieldAttrs & SelectFieldAttrs & DropdownListAttrs
