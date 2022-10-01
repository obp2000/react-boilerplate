import { cost, weight } from '../orders/calculator'
import {
  OrderItem,
  OrderItemFormValues,
} from '../../../interfaces'

export const initOrderItem = {
  product: undefined,
  price: 0,
  amount: 0,
  cost: 0,
  weight: 0,
  _destroy: false,
}

export const formInitialOrderItem =
  (orderItem: OrderItem): OrderItemFormValues => ({
    ...orderItem,
    cost: cost(orderItem),
    weight: weight(orderItem),
  })

export const formInitialOrderItems =
  (orderItems: OrderItem[] = []): OrderItemFormValues[] =>
    orderItems.map((orderItem) => formInitialOrderItem(orderItem)
    )
