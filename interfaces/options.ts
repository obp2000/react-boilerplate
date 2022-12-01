import type { CustomerOptions } from './customers'
import type {
  ProductOptions,
  ProductTypeChoice,
  ThreadsChoice,
  ContentsChoice,
} from './products'
import type {
  OrderOptions,
  PacketChoice,
  DeliveryTypeChoice,
} from './orders'
import type { UserOptions } from './users'
import type { LoginOptions, RegisterOptions, AuthState } from './auth'
import type { CommonConsts, CommonConstsType } from './commonConsts'
import type { OrderItemOptions } from './orderItems'
import type { IndexUrl } from '.'
import type { UserType } from './users'
import type { Children } from './layout'
// import type { SelectOptions } from './selectField'

export type AnyChoices = ProductTypeChoice | ThreadsChoice | ContentsChoice |
  PacketChoice | DeliveryTypeChoice

export type AnyChoicesType = {
  choices?: AnyChoices[]
}

export type FieldProps = AnyChoicesType & {
  type?: string
  required?: boolean
  read_only?: boolean
  label?: string
  min_value?: number
  max_value?: number
  help_text?: string
}

export type AnyObjectOptions = CustomerOptions | ProductOptions |
  OrderOptions

export type TableOptions = CustomerOptions | ProductOptions | OrderOptions

export type TableOptionsType = {
  options?: TableOptions
}

export type AnyOptions = TableOptions | UserOptions | LoginOptions |
  RegisterOptions | OrderItemOptions

export type AnyOptionsType = {
  options?: AnyOptions
}

export type AnyObjectOptionsType = {
  options?: AnyObjectOptions
}

export type RawOptionsAndCommonConsts = {
  common_consts?: CommonConsts
  actions?: { [index: string]: AnyObjectOptions }
}

export type OptionsOueryResult = AnyOptionsType & CommonConstsType & {
  isLoadingOptions: boolean
  isFetchingOptions: boolean
}

export type AuthContextType = AuthState & UserType & Children

export type MainContextType = AnyOptionsType & CommonConstsType & IndexUrl &
  Children

// export type MainContext1 = (indexUrl: string) => Promise<MainContextType>


// export type FieldPropsFromOptions = {
//   type?: string
//   id?: number
//   required?: boolean
//   readOnly?: boolean
//   placeholder?: string
//   'aria-label'?: string
//   min?: number
//   max?: number
//   helpText?: string
//   selectOptions?: SelectOptions[]
// }
