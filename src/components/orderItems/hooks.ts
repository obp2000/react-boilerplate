import { cost, weight } from '../orders/Calculator'
import {
  OrderItem,
  OrderItemFormValues,
  ProductOptions
} from '../../../interfaces'

type OrderItemProductOptionsProps = {
  product: {
    children: ProductOptions
  }
}

export const orderItemProductOptions = (props: OrderItemProductOptionsProps) =>
  props?.product?.children

export const initOrderItem = {
  id: undefined,
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
