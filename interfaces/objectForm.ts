import type { CustomerFormValues } from './customers'
import type { ProductFormValues } from './products'
import type { OrderFormValues } from './orders'
import type { AnyObjectType } from './api'
import type {
    AuthState,
  LoginFormValues,
  RegisterFormValues
} from './auth'
import type { IndexUrl } from '.'
import type { AnyOptionsType } from './options'
import type { CommonConstsType } from './commonConsts'
import type { Validate } from '@/validators/validators'

export type AnyObjectFormValues = CustomerFormValues | ProductFormValues |
  OrderFormValues

export type IsCalculatedFields = {
  fields?: { [index: string]: boolean }
  calculatedFields?: string[]
}

export type SubmitButtonProps = {
  isLoadingOptions?: boolean
  isFetchingOptions?: boolean
  text?: string
  className?: string
  isLoading?: boolean
  calculatedFields?: string[]
}

export type HeaderProps = AnyObjectType & SubmitButtonProps

export type AnyFormValues = CustomerFormValues | ProductFormValues |
  OrderFormValues | LoginFormValues | RegisterFormValues

export type ValidatedFields = Record<string, string[]>

export type FormProps =AnyObjectType & {initialValues: AnyObjectType}
