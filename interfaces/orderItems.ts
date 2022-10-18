import type { FieldArrayRenderProps } from 'react-final-form-arrays'
import type { CommonConstsType } from './commonConsts'
import type { FieldProps } from './options'
import type { Product, ProductOptions } from './products'
import type { OrderOptionsType } from './orders'

export type OrderItem = {
  id: number
  order: number
  product: Product
  product_id?: number
  amount: number
  price: number
  cost: number | string
  weight: number | string
  _destroy?: boolean
}

export type OrderItemOptions = {
  id: FieldProps
  order: FieldProps
  product: {
    type: 'nested object'
    required: boolean
    read_only: boolean
    label: string
    children: ProductOptions
  }
  amount: FieldProps
  price: FieldProps
  cost: FieldProps
  weight: FieldProps
}

export type OrderItemOptionsType = {
  options?: OrderItemOptions
}

export type OrderItemFormRender =
  FieldArrayRenderProps<Partial<OrderItem>, HTMLElement> & CommonConstsType &
  OrderOptionsType

export type DeleteOrderItemButtonProps = OrderItemFormRender & {
  index: number
}

export type OrderItemForm = {
  orderItemName: string
  index: number
}


// export type OrderItemFormValues = {
//   id?: number
//   order?: number
//   product?: Product
//   product_id?: number
//   amount?: number
//   price?: number
//   cost?: number | string
//   weight?: number | string
//   _destroy?: boolean
// }
