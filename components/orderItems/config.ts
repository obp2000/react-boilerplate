import type { OrderItem } from '../../interfaces/orderItems'
import { cost, weight } from '../orders/calculator'

export const initOrderItem = {
  product: undefined,
  price: 0,
  amount: 0,
  cost: 0,
  weight: 0,
  _destroy: false,
}

const formInitialOrderItem = (orderItem: OrderItem): OrderItem => ({
  ...orderItem,
  cost: cost(orderItem),
  weight: weight(orderItem),
})

export const formInitialOrderItems =
  (orderItems: OrderItem[] = []): OrderItem[] =>
    orderItems.map((orderItem) => formInitialOrderItem(orderItem))
