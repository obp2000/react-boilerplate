import {getIn} from 'final-form'
import createDecorator from 'final-form-calculate'
var math = require('lodash/math')

const canCountCost = ({
  amount,
  price
} = {}) => amount && price

const countCost = ({
  amount = 0,
  price = 0
} = {}) => amount * price

export const cost = (values) => countCost(values).toFixed(2)

const countWeight = ({
  amount = 0,
  product: {
    density = 0,
    width = 0,
  } = {},
}) => amount * density * width / 100

export const weight = (values) => parseInt(countWeight(values))

export const sumBy = ({order_items = []}, field) =>
  math.sumBy(order_items, (oderItem) => Number(oderItem[field]))

export const orderItemsAmount = (_, values) => sumBy(values, 'amount').toFixed(2)

export const orderItemsCost = (_, values) => sumBy(values, 'cost').toFixed(2)

export const orderItemsWeight = (_, values) => sumBy(values, 'weight')

export const postCostWithPacket = (_,
  {
    post_cost: postCost = 0,
    packet = 0
  } = {}) => (Number(postCost) + Number(packet)).toFixed(2)

const needPostDiscount = ({
  order_items_cost = 0,
  SUM_FOR_POST_DISCOUNT = 0,
} = {}) => order_items_cost >= SUM_FOR_POST_DISCOUNT

export const postDiscount = (_, {
  POST_DISCOUNT_PERCENT: postDiscountPercent = 0,
  ...values
}) => needPostDiscount(values)
    ? (postCostWithPacket(null, values) * postDiscountPercent / 100).toFixed(2)
    : 0

export const totalPostals = (_, values) =>
    (postCostWithPacket(null, values) - postDiscount(null, values)).toFixed(2)

export const totalSum = (_, values) =>
    (Number(values?.order_items_cost) +
      Number(totalPostals(null, values))).toFixed(2)

export const needGift = ({
  order_items_cost = 0,
  SUM_FOR_GIFT: sumForGift = 0
}) => order_items_cost >= sumForGift

export const totalWeight = (_, {
  order_items_weight = 0,
  SAMPLES_WEIGHT: samplesWeight = 0,
  PACKET_WEIGHT: packetWeight = 0,
  GIFT_WEIGHT: giftWeight = 0,
  ...values
}) => order_items_weight + samplesWeight + packetWeight +
  (needGift(values) ? giftWeight : 0)

const makeOrderItem = (values, name, field) => ({
      amount: getIn(values, name.replace(`.${field}`, '.amount')),
      price: getIn(values, name.replace(`.${field}`, '.price')),
      product: getIn(values, name.replace(`.${field}`, '.product'))
})

const orderItemsRegExp = (field) =>
  new RegExp(`order_items\\[\\d+\\]\\.${field}`)

export const orderCalculator = createDecorator({
  field: orderItemsRegExp('amount'),
  updates: (value, name, values) => {
    const orderItem = makeOrderItem(values, name, 'amount')
    return {
      [name.replace('.amount', '.cost')]: cost(orderItem),
      [name.replace('.amount', '.weight')]: weight(orderItem),
    }
  },
}, {
  field: orderItemsRegExp('price'),
  updates: (value, name, values) => {
    const orderItem = makeOrderItem(values, name, 'price')
    return {
      [name.replace('.price', '.cost')]: cost(orderItem),
    }
  },
}, {
  field: orderItemsRegExp('product'),
  updates: (value, name, values) => {
    const orderItem = makeOrderItem(values, name, 'product')
    return {
      [name.replace('.product', '.price')]: value?.price,
      [name.replace('.product', '.weight')]: weight(orderItem),
    }
  },
}, {
  field: orderItemsRegExp('amount'),
  updates: {
    order_items_amount: orderItemsAmount,
  },
}, {
  field: orderItemsRegExp('cost'),
  updates: {
    order_items_cost: orderItemsCost,
  },
}, {
  field: orderItemsRegExp('weight'),
  updates: {
    order_items_weight: orderItemsWeight,
  }
}, {
  field: 'order_items_cost',
  updates: {
    post_discount: postDiscount,
    total_postals: totalPostals,
    total_sum: totalSum,
    total_weight: totalWeight,
  },
}, {
  field: 'order_items_weight',
  updates: {
    total_weight: totalWeight
  },
}, {
    field: 'post_cost',
    updates: {
        post_cost_with_packet: postCostWithPacket,
        post_discount: postDiscount,
        total_postals: totalPostals,
        total_sum: totalSum,
    },
}, {
    field: 'packet',
    updates: {
        post_cost_with_packet: postCostWithPacket,
        post_discount: postDiscount,
        total_postals: totalPostals,
        total_sum: totalSum,
    },
})
