import type { FieldRenderProps } from 'react-final-form'
import type { InputType } from 'reactstrap/types/lib/Input'
import {
  FieldProps,
  CustomerOptions,
  ProductOptions,
  OrderOptions,
  ProductTypeChoice,
  ThreadsChoice,
  ContentsChoice,
  PacketChoice,
  DeliveryTypeChoice,
} from '../../../interfaces'
import {
  LoginOptions,
  RegisterOptions,
} from '../../../interfaces/auth'
import type { SelectFieldAttrs } from '../selectField/hooks'

export type AllOptions = CustomerOptions | ProductOptions | OrderOptions |
  LoginOptions | RegisterOptions

export type FieldAttrs = FieldRenderProps<string | number | undefined> & {
  options: AllOptions
  searchPath?: string
}

export type AnyFieldAttrs = FieldAttrs & SelectFieldAttrs

export type AllChoices = ProductTypeChoice & ThreadsChoice & ContentsChoice &
  PacketChoice & DeliveryTypeChoice

type FieldPropsWithChoices = FieldProps & {
  choices: AllChoices[]
}

export type SearchHandler = (term: string) => void

export type HtmlAttrs = {
  name: string
  id?: string
  type?: InputType
  label?: string
  placeholder?: string
  required?: boolean
  readOnly?: boolean
  'aria-label'?: string
  min?: number
  max?: number
  accept?: string
  choices?: AllChoices[]
  helpText?: string
  invalid?: boolean
  valid?: boolean
}

export const getName = (props: FieldAttrs) => props.name ?? props.input?.name

export const getFieldOptions =
  (options: AllOptions | undefined, name: string) => {
    if (options && name) {
      const nameMod = name.split('.').pop() as keyof AllOptions
      return options[nameMod] as FieldPropsWithChoices
    }
  }

export const useFieldProps = (fieldAttrs: FieldAttrs) => {
  const name = getName(fieldAttrs)
  return getFieldOptions(fieldAttrs.options, name)
}
