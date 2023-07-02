import {
  type Dispatch,
  type SetStateAction,
  type SyntheticEvent,
  type HTMLAttributes,
  Fragment,
  ReactNode
} from 'react'
import type { City } from '@/interfaces/cities'
import type { Customer } from '@/interfaces/customers'
import type { Product } from '@/interfaces/products'
import type { TextFieldProps } from '@mui/material/TextField'
import type { FieldError, ControllerRenderProps } from "react-hook-form"
import { Translation } from '@/app/i18n/dictionaries'
import {
  CircularProgress,
  TextField,
  InputAdornment,
  type AutocompleteInputChangeReason,
  type InputBaseComponentProps
} from '@mui/material'

type Result = (
  _event: SyntheticEvent,
  term: string,
  reason: AutocompleteInputChangeReason
) => Promise<void | Response> | undefined

export function onSearch(
  searchPath: string,
  setData: Dispatch<SetStateAction<Product[]>>,
  setBusy: Dispatch<SetStateAction<boolean>>,
  currentValue: Product | null
): Result
export function onSearch(
  searchPath: string,
  setData: Dispatch<SetStateAction<City[]>>,
  setBusy: Dispatch<SetStateAction<boolean>>,
  currentValue: City | null
): Result
export function onSearch(
  searchPath: string,
  setData: Dispatch<SetStateAction<Customer[]>>,
  setBusy: Dispatch<SetStateAction<boolean>>,
  currentValue: Customer | null
): Result
export function onSearch(
  searchPath: string,
  setData: Dispatch<SetStateAction<any>>,
  setBusy: Dispatch<SetStateAction<boolean>>,
  currentValue: any
): Result {
  return (_, term, reason) => {
    if (reason === 'input' && typeof term === 'string' && term.length > 1) {
      setBusy(true)
      const searchParams = new URLSearchParams()
      searchParams.set('term', term)
      return fetch(`/api/${searchPath}?${searchParams}`)
        .then(res => res.json()
          .then((results) => {
            setData(currentValue ? [currentValue, ...results] : results)
            setBusy(false)
          }))
    }
  }
}

type anyObject = City | Customer | Product

export function isOptionEqualToValue(option: anyObject, value: anyObject) {
  return value === undefined || option.id === value.id
}

export function getRenderInput({
  label,
  error,
  busy: disabled,
  loading,
  errorMessages,
  field: {
    ref,
    ...field
  },
}: {
  label: string
  error?: FieldError
  busy: boolean
  loading: boolean
  errorMessages: Translation['errorMessages']
  field: Omit<ControllerRenderProps, 'onChange'>
}) {
  return ({
    InputProps,
    inputProps,
    ...params
  }: JSX.IntrinsicAttributes & TextFieldProps) => {
    const endAdornment = <>
      {loading ? <CircularProgress color="inherit" size={15} /> : null}
      {InputProps?.endAdornment}
    </>
    return <TextField {...params} {...field}
      {...{
        inputRef: ref,
        label,
        disabled,
        error: !!error,
        helperText: errorText(errorMessages, error),
        InputProps: { ...InputProps, endAdornment },
        inputProps: { ...inputProps, autoComplete: 'new-password' },
      }}
    />
  }
}

type OptionType = (props: HTMLAttributes<HTMLLIElement>, option: City | Customer | Product) => ReactNode

export function getRenderOption(getOptionLabel: (city: City) => string): OptionType
export function getRenderOption(getOptionLabel: (customer: Customer) => string): OptionType
export function getRenderOption(getOptionLabel: (product: Product) => string): OptionType
export function getRenderOption(getOptionLabel: any): OptionType {
  return function renderOptions(props: HTMLAttributes<HTMLLIElement>, option: City | Customer | Product) {
    return <li {...props} key={option.id}>
      {getOptionLabel(option)}
    </li>
  }
}

export function unitsLabel(label: string) {
  return {
    endAdornment: <InputAdornment position="end">
      {label}
    </InputAdornment>,
  }
}

export function errorText(
  errorMessages?: Translation['errorMessages'],
  error?: FieldError,
) {
  return error && errorMessages?.[error.message as keyof Translation['errorMessages']]
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
