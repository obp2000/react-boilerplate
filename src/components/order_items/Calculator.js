import createDecorator from 'final-form-calculate'
import {
  postDiscount,
  totalPostals,
  totalSum,
  needGift,
  totalWeight,
} from '../orders/Calculator'

const weight = ({amount = 0, product}) =>
  amount * product?.density * product?.width / 100

const cost = ({amount = 0, price = 0}) => amount * price

const findIndex = (name) => parseInt(name.replace('order_items[', ''))

const orderItemsSum = (
    orderItems = [],
    name,
) => orderItems.reduce((sum, {
  [name]: value}) => sum + Number(value || 0), 0)

const totalText = ({
  order_items_cost_label: orderItemsCostLabel,
  need_gift_label: needGiftLabel,
  ...values
}) => {
  const label = [orderItemsCostLabel]
  if (needGift(values)) {
    label.push('-')
    label.push(needGiftLabel)
  }
  return label.join(' ')
}

export const orderItemsCalculator = createDecorator({
  field: /order_items\[\d+\]\.amount/,
  updates: (_, name, {order_items: orderItems = []}) => {
    const orderItem = orderItems[findIndex(name)]
    return {
      [name.replace('.amount', '.cost')]: cost(orderItem).toFixed(2),
      [name.replace('.amount', '.weight')]: weight(orderItem).toFixed(0),
      order_items_amount: orderItemsSum(orderItems, 'amount').toFixed(2),
    }
  },
}, {
  field: /order_items\[\d+\]\.price/,
  updates: (_, name, {order_items: orderItems = []}) => {
    const orderItem = orderItems[findIndex(name)]
    return {
      [name.replace('.price', '.cost')]: cost(orderItem).toFixed(2),
    }
  },
}, {
  field: /order_items\[\d+\]\.product/,
  updates: (product, name, {order_items: orderItems = []}) => {
    const orderItem = orderItems[findIndex(name)]
    return {
      [name.replace('.product', '.price')]: product?.price,
      [name.replace('.product', '.weight')]: weight(orderItem).toFixed(0),
    }
  },
}, {
  field: /order_items\[\d+\]\.cost/,
  updates: (value, name, {order_items: orderItems = []}) => ({
    order_items_cost: orderItemsSum(orderItems, 'cost').toFixed(2),
  }),
}, {
  field: /order_items\[\d+\]\.weight/,
  updates: (value, name, {order_items: orderItems = []}) => ({
    order_items_weight: orderItemsSum(orderItems, 'weight').toFixed(0),
  }),
}, {
  field: 'order_items_cost',
  updates: (_, name, values) => ({
    post_discount: postDiscount(values).toFixed(2),
    total_postals: totalPostals(values).toFixed(2),
    total_sum: totalSum(values).toFixed(2),
    total_text: totalText(values),
    total_weight: totalWeight(values).toFixed(0),
    need_gift: needGift(values),
  }),
}, {
  field: 'order_items_weight',
  updates: (_, name, values) => ({
    total_weight: totalWeight(values).toFixed(0),
  }),
})
