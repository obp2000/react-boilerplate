import type { FormProps, FormRenderProps } from 'react-final-form'
import type { Customer } from './customers'
import type { Product } from './products'
import type { Order } from './orders'
import type { CommonConstsType } from './commonConsts'
import type { AnyObjectType } from './api'
import type { AnyOptionsType, AnyObjectOptionsType } from './options'

export type AnyObjectFormValues = Partial<Customer> | Partial<Product> |
  Partial<Order>

export type ObjectFormProps = FormProps & CommonConstsType & AnyObjectType &
  AnyOptionsType & {
    isMutatingObject: boolean
    isSuccessMutatingObject: boolean
    busyGettingObject: boolean
    isErrorGettingObject: boolean
    calculatedFields?: string[]
  }

export type IsCalculatedFields = {
  fields?: { [index: string]: boolean }
  calculatedFields?: string[]
}

// export type SubmitButtonProps = FormRenderProps & {
//   isLoading?: boolean
//   calculatedFields?: string[]
// }

export type SubmitButtonProps = {
  isLoadingOptions?: boolean
  isFetchingOptions?: boolean
  text?: string
  className?: string
  isLoading?: boolean
  calculatedFields?: string[]
}

export type HeaderProps = AnyObjectType & SubmitButtonProps
