import { InputAdornment } from '@mui/material'

import type { Translation } from '@/app/i18n/dictionaries'
import type {	InputBaseComponentProps } from '@mui/material'
import type {
	FieldError,
	FieldErrorsImpl,
	Merge
} from "react-hook-form"

export function unitsLabel(label: string) {
  return {
    endAdornment: <InputAdornment position="end">
      {label}
    </InputAdornment>,
  }
}

export function errorText(
  errorMessages?: Translation['errorMessages'],
  error?: Merge<FieldError, FieldErrorsImpl<{}>>,
) {
  return error && errorMessages?.[error.message as
    keyof Translation['errorMessages']]
}

export const inputNumeric = {
  inputMode: 'numeric',
  pattern: '[0-9]*',
  step: '1',
  min: 0,
} as InputBaseComponentProps

export const inputDecimal = {
  inputMode: 'decimal',
  step: '0.1',
  min: 0,
} as InputBaseComponentProps

export function floatValue(value: string) {
  // console.log('value ', value)
 return value === '' || value === null ? null : parseFloat(value)
}

export function integerValue(value: string) {
 return value === '' || value === null ? null : parseInt(value)
}
