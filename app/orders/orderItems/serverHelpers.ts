import 'server-only'

import { cost, weight, type Order } from '@/app/orders/calculator'

export function formInitialOrderItems(orderItems: Order['orderItems'] = []) {
  return orderItems.map((orderItem) => ({
    ...orderItem,
    cost: cost(orderItem),
    weight: weight(orderItem),
  }))
}


// function formInitialOrderItem(orderItem) {
//   return {
//     ...orderItem,
//     cost: cost(orderItem),
//     weight: weight(orderItem),
//   }
// }
