import createDecorator from 'final-form-calculate'
var math = require('lodash/math')
import {
  postDiscount,
  totalPostals,
  totalSum,
  needGift,
  totalWeight,
} from '../orders/Calculator'

export const cost = (values) => values?.amount && values?.price
  ? (values?.amount * values?.price).toFixed(2)
  : 0

export const weight = (values) =>
  values?.amount && values?.product && values?.product?.density &&
    values?.product?.width
  ? parseInt(values?.amount * values?.product?.density *
      values?.product?.width / 100)
  : 0

const findIndex = (name) => parseInt(name.match(/\d+/)[0])

const findOrderItem = (name, values) => values?.order_items[findIndex(name)]

export const sumBy = (values, field) =>
  math.sumBy(values?.order_items, (oi) => Number(oi[field]))

export const orderItemsAmount = (_, values) => sumBy(values, 'amount').toFixed(2)

export const orderItemsCost = (_, values) => sumBy(values, 'cost').toFixed(2)

export const orderItemsWeight = (_, values) => sumBy(values, 'weight')

export const orderItemsCalculator = createDecorator({
  field: /order_items\[\d+\]\.amount/,
  updates: (_, name, values) => {
    const orderItem = findOrderItem(name, values)
    return {
      [name.replace('.amount', '.cost')]: cost(orderItem),
      [name.replace('.amount', '.weight')]: weight(orderItem),
    }
  },
}, {
  field: /order_items\[\d+\]\.price/,
  updates: (_, name, values) => {
    const orderItem = findOrderItem(name, values)
    return {
      [name.replace('.price', '.cost')]: cost(orderItem),
    }
  },
}, {
  field: /order_items\[\d+\]\.product/,
  updates: (product, name, values) => {
    const orderItem = findOrderItem(name, values)
    return {
      [name.replace('.product', '.price')]: product?.price,
      [name.replace('.product', '.weight')]: weight(orderItem),
    }
  },
}, {
  field: /order_items\[\d+\]\.amount/,
  updates: {
    order_items_amount: orderItemsAmount,
  },
}, {
  field: /order_items\[\d+\]\.cost/,
  updates: {
    order_items_cost: orderItemsCost,
  },
}, {
  field: /order_items\[\d+\]\.weight/,
  updates: {
    order_items_weight: orderItemsWeight,
  }
}, {
  field: 'order_items_cost',
  updates: (_, name, values) => ({
    post_discount: postDiscount(values),
    total_postals: totalPostals(values),
    total_sum: totalSum(values),
    total_weight: totalWeight(values),
  }),
}, {
  field: 'order_items_weight',
  updates: (_, name, values) => ({
    total_weight: totalWeight(values)
  }),
})
