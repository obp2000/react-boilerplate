import arrayMutators from 'final-form-arrays'
import { calculator, postCostCount } from './calculator'
import type { Order } from '@/interfaces/orders'
import type { OrderItem } from '@/interfaces/orderItems'

const modOrderItem = ({
  product,
  cost,
  weight,
  _destroy,
  ...orderItem
}: OrderItem): OrderItem => {
  if (product) {
    orderItem.product_id = product.id
  }
  return orderItem as OrderItem
}

const modOrderItems = (orderItems: OrderItem[]) => orderItems.map(modOrderItem)

export const modFormValues = ({
  id,
  customer,
  samples_weight,
  packet_weight,
  gift_weight,
  order_items_amount,
  order_items_cost,
  order_items_weight,
  created_at,
  updated_at,
  consts,
  post_cost_with_packet,
  post_discount,
  total_postals,
  total_sum,
  total_weight,
  ...values
}: Order): Partial<Order> => {
  if (customer) {
    values.customer_id = customer.id
  }
  if (values.order_items) {
    values.order_items = modOrderItems(values.order_items)
  }
  return values
}

export const decorators = [calculator]

export const mutators = { postCostCount, ...arrayMutators }

export const validatedFields = {
  notBlank: ['customer'],
}

// export const getInitialValues = ({
//   object,
//   options
// }: OrderType & OrderOptionsType): OrderFormValues => {
//   const orderItems = {
//     order_items: formInitialOrderItems(object?.order_items),
//   }
//   let objectValues = {
//     ...object,
//     consts: options?.Consts,
//     samples_weight: options?.Consts.SAMPLES_WEIGHT,
//     packet_weight: options?.Consts.PACKET_WEIGHT,
//     gift_weight: options?.Consts.GIFT_WEIGHT,
//     ...orderItems,
//     order_items_amount: orderItemsAmount(null, orderItems),
//     order_items_cost: orderItemsCost(null, orderItems),
//     order_items_weight: orderItemsWeight(null, orderItems),
//   }
//   objectValues = {
//     ...objectValues,
//     post_cost_with_packet: postCostWithPacket(null, objectValues),
//     post_discount: postDiscount(null, objectValues),
//     total_postals: totalPostals(null, objectValues),
//   }
//   return {
//     ...objectValues,
//     total_sum: totalSum(null, objectValues),
//     total_weight: totalWeight(null, objectValues),
//   }
// }






// export const calculatedFields = [
//   'post_cost_with_packet',
//   'post_discount',
//   'total_postals',
//   'total_sum',
//   'total_weight',
// ]

// const modOrderItems = (orderItems: OrderItem[]) => orderItems.map(({
//   product,
//   cost,
//   weight,
//   _destroy,
//   ...orderItem
// }) => {
//   if (product) {
//     orderItem.product_id = product.id
//   }
//   return orderItem as OrderItem
// })
