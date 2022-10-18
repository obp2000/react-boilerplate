import { AnyOptionsType } from './options'

export type SelectOptions = {
  value: number | string
  label: string
}

export type SelectFieldAttrs = AnyOptionsType & {
  name: string
  dataKey: string
  textField: string
  label?: string
  helpText?: string
  required?: boolean
  readOnly?: boolean
}
