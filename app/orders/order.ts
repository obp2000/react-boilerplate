import {
  array,
  object,
  optional, string,
  integer,
  nullable,
} from 'superstruct'
import { OrderItem, OrderItemApi } from './orderItems/orderItem'
import {
  Option,
  ToInteger,
  NumberOrPattern,
  ToFloat,
} from '@/app/form/fields'
import { CustomerSelect } from '@/app/customers/customer'

export const Order = object({
  postCost: optional(nullable(NumberOrPattern)),
  packet: optional(nullable(Option)),
  deliveryType: optional(nullable(Option)),
  address: optional(string()),
  gift: optional(string()),
  customer: CustomerSelect,
  orderItems: optional(array(OrderItem)),
})

export const OrderApi = object({
  postCost: optional(ToFloat),
  packet: optional(ToInteger),
  deliveryType: optional(ToInteger),
  address: optional(string()),
  gift: optional(string()),
  customerId: integer(),
  orderItems: optional(array(OrderItemApi)),
})


// export function validate22({
//   body: {
//     post_cost,
//     packet,
//     delivery_type,
//     address = '',
//     gift = '',
//     customer,
//     orderItems,
//   } }: NextApiRequest) {
//   const orderItemsData = orderItems.map(({
//     id,
//     product,
//     amount,
//     price
//   }: OrderType['orderItems'][number]) => ({
//     id,
//     product: product ? { id: product.id } : undefined,
//     amount: amount ? parseFloat(amount) : undefined,
//     price: price ? parseInt(price) : undefined,
//   }))
//   const data = {
//     post_cost: post_cost ? parseFloat(post_cost) : undefined,
//     packet: packet === '' ? undefined : parseInt(packet),
//     delivery_type: delivery_type === '' ? undefined : parseInt(delivery_type),
//     address,
//     gift,
//     customer,
//     orderItems: orderItemsData,
//   }
//   create(data, Order)
//   return data
// }
