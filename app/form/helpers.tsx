import {
  type Dispatch,
  type SetStateAction,
  type SyntheticEvent,
  type ChangeEvent,
  type HTMLAttributes,
  Fragment,
  ReactNode
} from 'react'
import type { City } from '@/interfaces/cities'
import type { Customer } from '@/interfaces/customers'
import type { Product } from '@/interfaces/products'
import TextField, { type TextFieldProps } from '@mui/material/TextField'
import type { FieldError, ControllerRenderProps } from "react-hook-form"
import { Translation } from '../i18n/dictionaries'
import CircularProgress from '@mui/material/CircularProgress'
import InputAdornment from '@mui/material/InputAdornment'

export function onSearch(
  searchPath: string | undefined,
  setData: Dispatch<SetStateAction<Product[]>>,
  setBusy: Dispatch<SetStateAction<boolean>>,
  currentValue: Product | null
): (_event: SyntheticEvent, term: string) => Promise<void | Response> | undefined
export function onSearch(
  searchPath: string | undefined,
  setData: Dispatch<SetStateAction<City[]>>,
  setBusy: Dispatch<SetStateAction<boolean>>,
  currentValue: City | null
): (_event: SyntheticEvent, term: string) => Promise<void | Response> | undefined
export function onSearch(
  searchPath: string | undefined,
  setData: Dispatch<SetStateAction<Customer[]>>,
  setBusy: Dispatch<SetStateAction<boolean>>,
  currentValue: Customer | null
): (_event: SyntheticEvent, term: string) => Promise<void | Response> | undefined
export function onSearch(
  searchPath: string | undefined,
  setData: Dispatch<SetStateAction<any>>,
  setBusy: Dispatch<SetStateAction<boolean>>,
  currentValue: any
): (_event: SyntheticEvent, term: string) => Promise<void | Response> | undefined {
  return (_event: SyntheticEvent, term: string) => {
    if (typeof term === 'string' && term.length === 2) {
      setBusy(true)
      const searchParams = new URLSearchParams()
      searchParams.set('term', term)
      return fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${searchPath}?${searchParams}`)
        .then(res => res.json()
          .then((results) => {
            // console.log('results.includes(initData) ', results.map(({ id }) => id).includes(initData.id))
            // results.
            setData(currentValue ? [currentValue, ...results] : results)
            setBusy(false)
          }))
    }
  }
}

export function filesHandler({
  setPreviewUrl,
  onChange
}: {
  setPreviewUrl: Dispatch<SetStateAction<string | null>>
  onChange: (...event: File[]) => void
}) {
  return (e: ChangeEvent<HTMLInputElement>) => {
    const fileInput = e.target
    if (!fileInput.files) {
      alert("No file was chosen")
      return
    }
    const file = fileInput.files[0]
    setPreviewUrl(URL.createObjectURL(file))
    /** Reset file input */
    e.currentTarget.type = "text"
    e.currentTarget.type = "file"
    onChange(file)
  }
}

export function isOptionEqualToValue(
  option: City | Customer | Product,
  value: City | Customer | Product) {
  return value === undefined || option.id === value.id
}

export function getRenderInput({
  label,
  error,
  busy,
  loading,
  errorMessages,
  field,
  ref,
}: {
  label: string
  error?: FieldError
  busy: boolean
  loading: boolean
  errorMessages: Translation['errorMessages']
  field?: Omit<ControllerRenderProps, 'onChange' | 'ref'>
  ref?: ControllerRenderProps['ref']
}) {
  return function (params: JSX.IntrinsicAttributes & TextFieldProps) {
    const helperText = !!error
      ? errorMessages[error.message as keyof Translation['errorMessages']]
      : undefined
    const InputProps = {
      ...params.InputProps,
      endAdornment: <Fragment>
        {loading ? <CircularProgress color="inherit" size={15} /> : null}
        {params.InputProps?.endAdornment}
      </Fragment>
    }
    const inputProps = {
      ...params.inputProps,
      autoComplete: 'new-password',
    }
    let fieldProps = {} as TextFieldProps
    if (field) {
      fieldProps = field
    }
    if (ref) {
      fieldProps.inputRef = ref
    }
    return <TextField {...params} {...fieldProps}
      label={label}
      disabled={busy}
      error={!!error}
      helperText={helperText}
      InputProps={InputProps}
      inputProps={inputProps}
    />
  }
}

type OptionType = (props: HTMLAttributes<HTMLLIElement>, option: City | Customer | Product) => ReactNode

export function getRenderOption(getOptionLabel: (city: City) => string): OptionType
export function getRenderOption(getOptionLabel: (customer: Customer) => string): OptionType
export function getRenderOption(getOptionLabel: (product: Product) => string): OptionType
export function getRenderOption(getOptionLabel: any): OptionType {
  return function (props: HTMLAttributes<HTMLLIElement>, option: City | Customer | Product) {
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
