import {
  array,
  object,
  optional,
  coerce,
  union,
  number,
  pattern,
  string,
  integer,
} from 'superstruct'
import { OrderItem } from './orderItems/orderItem'
import { OptionalOption } from '@/app/form/fields'

export const Order = object({
  postCost: coerce(optional(union([number(), pattern(string(), /\d*/)])), string(),
    (value) => value === '' ? 0 : parseFloat(value)),
  packet: OptionalOption,
  deliveryType: OptionalOption,
  address: optional(string()),
  gift: optional(string()),
  customerId: integer(),
  orderItems: optional(array(OrderItem)),
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
