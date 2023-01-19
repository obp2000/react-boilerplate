import { cost, weight } from '@/app/[lng]/orders/[id]/calculator'
import type { OrderItemSelect } from '@/interfaces/api'

function formInitialOrderItem(orderItem: OrderItemSelect): OrderItemSelect {
  return {
    ...orderItem,
    cost: cost(orderItem),
    weight: weight(orderItem),
  }
}

export function formInitialOrderItems(orderItems: OrderItemSelect[] = []) {
  return orderItems.map((orderItem) => formInitialOrderItem(orderItem))
}


// export const initOrderItem = {
//   price: 0,
//   // amount: new Decimal(0),
//   amount: 0 as unknown as Decimal,
//   cost: '',
//   weight: '',
// }
