import type { FormRenderProps } from 'react-final-form'
import type { Decorator, Mutator } from 'final-form'
import type { IndexUrl } from './index'
import type { FieldLabel } from './inputLabel'
import type { FieldProps } from './options'
import type { CommonConstsType } from './commonConsts'
import {
  getOrders,
  useGetOrderQuery,
  useCreateOrderMutation,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
} from '../src/components/orders/apiSlice'
import TableRow from '../src/components/orders/TableRow'
import TableLabels from '../src/components/orders/TableLabels'
import { validate } from '../src/components/orders/validators'
import objectFormRender from '../src/components/orders/OrderFormRender'
import { Customer, CustomerOptions } from './customers'
import { OrderItem, OrderItemOptions } from './orderItems'

export type Order = {
  id: number
  customer: Customer
  customer_id?: number
  post_cost: number
  packet: number
  delivery_type: number
  address: string
  gift: string
  order_items: OrderItem[]
  order_items_amount?: number | string
  order_items_cost?: number | string
  order_items_weight?: number
  samples_weight?: number
  packet_weight?: number
  gift_weight?: number
  post_cost_with_packet?: number | string
  post_discount?: number | string
  total_postals?: number | string
  total_sum?: number | string
  total_weight?: number
  consts?: OrderConsts
  created_at: string
  updated_at: string
}

export type OrderConsts = {
  SUM_FOR_POST_DISCOUNT: number
  POST_DISCOUNT_PERCENT: number
  SUM_FOR_GIFT: number
  GIFT_WEIGHT: number
  PACKET_WEIGHT: number
  SAMPLES_WEIGHT: number
}

// export type OrderFormValues = {
//   id?: number
//   customer?: Customer
//   customer_id?: number
//   post_cost?: number
//   packet?: number
//   delivery_type?: number
//   address?: string
//   gift?: string
//   order_items?: OrderItem[]
//   order_items_amount?: number | string
//   order_items_cost?: number | string
//   order_items_weight?: number
//   samples_weight?: number
//   packet_weight?: number
//   gift_weight?: number
//   post_cost_with_packet?: number | string
//   post_discount?: number | string
//   total_postals?: number | string
//   total_sum?: number | string
//   total_weight?: number
//   consts?: OrderConsts
//   created_at?: string
//   updated_at?: string
// }

export type PacketChoice = {
  value?: number
  display_name: string
}

export type DeliveryTypeChoice = {
  value?: number
  display_name: string
}

export type OrderOptions = {
  id: FieldProps
  customer: {
    type: 'nested object'
    required: boolean
    read_only: boolean
    label: string
    children: CustomerOptions
  }
  post_cost: FieldProps
  packet: {
    type: 'choice'
    required: boolean
    read_only: boolean
    label: string
    choices: PacketChoice[]
  }
  delivery_type: {
    type: 'choice'
    required: boolean
    read_only: boolean
    label: string
    choices: DeliveryTypeChoice[]
  }
  address: FieldProps
  gift: FieldProps
  order_items: {
    type: 'field'
    required: boolean
    read_only: boolean
    label: string
    child: {
      type: 'nested object'
      required: boolean
      read_only: boolean
      children: OrderItemOptions
    }
  }
  order_items_amount: FieldProps
  order_items_cost: FieldLabel
  order_items_weight: FieldProps
  created_at: FieldProps
  updated_at: FieldProps
  name_singular: string
  name_plural: string
  post_cost_with_packet: FieldLabel
  post_discount: FieldLabel
  total_postals: FieldLabel
  total_sum: FieldLabel
  need_gift: FieldLabel
  samples: FieldLabel
  Consts: OrderConsts
}

export type OrderOptionsType = {
  options?: OrderOptions
}

export type OrderWithOptions = OrderOptionsType & {
  object?: Order
}

export type TableConfig = IndexUrl & {
  getObjects: typeof getOrders
  TableRow: typeof TableRow
  TableLabels: typeof TableLabels
  useDeleteObjectMutation: typeof useDeleteOrderMutation
}

export type FormConfig = IndexUrl & {
  useGetObjectQuery: typeof useGetOrderQuery
  formInitialValues: OrderWithOptions
  formDecorators: Decorator[]
  mutators: { [index: string]: Mutator }
  validate: typeof validate
  useUpdateObjectMutation: typeof useUpdateOrderMutation
  useCreateObjectMutation: typeof useCreateOrderMutation
  objectFormRender: typeof objectFormRender
  calculatedFields: string[]
}

export type OrderFormProps = FormRenderProps & CommonConstsType &
  OrderWithOptions
