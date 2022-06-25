const initOrderItem = {
  product: {},
  price: 0,
  amount: 0,
  _destroy: false,
}

const tableFieldNames = [
  'product',
  'price',
  'amount',
  'cost',
  'weight',
]

const addOrderItemAction = (fields) => fields.push(initOrderItem)

const deleteOrderItemAction = (fields, id) => fields.remove(id)

const config = {
	tableFieldNames,
	addOrderItemAction,
	deleteOrderItemAction
}

export default config
