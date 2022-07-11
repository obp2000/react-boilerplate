import {cost, weight} from '../orders/Calculator'

const emptyArray = []

const initOrderItem = {
  product: undefined,
  price: 0,
  amount: 0,
  cost: 0,
  weight: 0,
  _destroy: false,
}

const tableFieldNames = [
  'product',
  'price',
  'amount',
  'cost',
  'weight',
]

const addOrderItemAction = (push) => push('order_items', initOrderItem)

const deleteOrderItemAction = (id, fields) => {
  fields.update(id, initOrderItem)
  fields.remove(id)
}

export const formInitialOrderItem = (orderItem) => ({
      ...orderItem,
      cost: cost(orderItem),
      weight: weight(orderItem),
  })

export const formInitialOrderItems = (orderItems = emptyArray) =>
  orderItems.map((orderItem, index) => formInitialOrderItem(orderItem)
  )

const config = {
  initOrderItem,
	tableFieldNames,
	addOrderItemAction,
	deleteOrderItemAction,
  formInitialOrderItems,
  formInitialOrderItem
}

export default config

