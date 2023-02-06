import 'server-only'

import { cost, weight } from '@/app/[lng]/orders/[id]/calculator'
import type { Order } from '@/app/[lng]/orders/[id]/helpers'

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
