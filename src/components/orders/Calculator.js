import {getIn} from 'final-form'
import createDecorator from 'final-form-calculate'
const math = require('lodash/math')

const emptyObject = {}

const countCost = ({
  amount = 0,
  price = 0,
}) => amount * price

export const cost = (values) => countCost(values).toFixed(2)

const countWeight = ({
  amount = 0,
  product: {
    density = 0,
    width = 0,
  } = emptyObject,
}) => amount * density * width / 100

export const weight = (values) => parseInt(countWeight(values))

export const sumBy = ({order_items = []}, field) =>
  math.sumBy(order_items, (oderItem) => Number(oderItem[field]))

export const orderItemsAmount = (_, values) => sumBy(values, 'amount').toFixed(2)

export const orderItemsCost = (_, values) => sumBy(values, 'cost').toFixed(2)

export const orderItemsWeight = (_, values) => sumBy(values, 'weight')

export const postCostWithPacket = (_, {
  post_cost: postCost = 0,
  packet = 0,
} = emptyObject) => (Number(postCost) + Number(packet)).toFixed(2)

const needPostDiscount = ({
  order_items_cost = 0,
  SUM_FOR_POST_DISCOUNT = 0,
} = emptyObject) => order_items_cost >= SUM_FOR_POST_DISCOUNT

export const postDiscount = (_, {
  POST_DISCOUNT_PERCENT: postDiscountPercent = 0,
  ...values
}) => needPostDiscount(values) ?
    (postCostWithPacket(null, values) * postDiscountPercent / 100).toFixed(2) :
    0

export const totalPostals = (_, values) =>
  (postCostWithPacket(null, values) - postDiscount(null, values)).toFixed(2)

export const totalSum = (_, values) =>
  (Number(values?.order_items_cost) +
      Number(totalPostals(null, values))).toFixed(2)

export const needGift = ({
  order_items_cost = 0,
  SUM_FOR_GIFT: sumForGift = 0,
}) => order_items_cost >= sumForGift

export const totalWeight = (_, {
  order_items_weight = 0,
  SAMPLES_WEIGHT: samplesWeight = 0,
  PACKET_WEIGHT: packetWeight = 0,
  GIFT_WEIGHT: giftWeight = 0,
  ...values
}) => order_items_weight +
      samplesWeight +
      packetWeight +
      (needGift(values) ? giftWeight : 0)

const makeOrderItem = (value, name, values, field) => ({
  amount: getIn(values, name.replace(`.${field}`, '.amount')),
  price: getIn(values, name.replace(`.${field}`, '.price')),
  product: getIn(values, name.replace(`.${field}`, '.product')),
})

const orderItemsRegExp = (field) =>
  new RegExp(`order_items\\[\\d+\\]\\.${field}`)

export const calculator = ({
  Consts: orderConsts = emptyObject,
} = emptyObject) => {
  // console.log('order Consts ', orderConsts)

  const updatePostCostWithPacket = {
    post_cost_with_packet: postCostWithPacket,
  }

  const updatePostDiscount = {
    post_discount: (_, values) => postDiscount(_, {...values, ...orderConsts}),
  }

  const updateTotalPostals = {
    total_postals: (_, values) => totalPostals(_, {...values, ...orderConsts}),
  }

  const updateTotalSum = {
    total_sum: (_, values) => totalSum(_, {...values, ...orderConsts}),
  }

  const updateTotalWeight = {
    total_weight: (_, values) => totalWeight(_, {...values, ...orderConsts}),
  }

  return createDecorator({
    field: orderItemsRegExp('amount'),
    updates: (value, name, values) => {
    // updates: (...args) => {
      // console.log('updates args', args)
      const orderItem = makeOrderItem(undefined, name, values, 'amount')
      return {
        [name.replace('.amount', '.cost')]: cost(orderItem),
        [name.replace('.amount', '.weight')]: weight(orderItem),
      }
    },
  }, {
    field: orderItemsRegExp('price'),
    updates: (value, name, values) => {
      const orderItem = makeOrderItem(undefined, name, values, 'price')
      return {
        [name.replace('.price', '.cost')]: cost(orderItem),
      }
    },
  }, {
    field: orderItemsRegExp('product'),
    updates: (value, name, values) => {
      const orderItem = makeOrderItem(undefined, name, values, 'product')
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
    },
  }, {
    field: 'order_items_cost',
    updates: {
      ...updatePostDiscount,
      ...updateTotalPostals,
      ...updateTotalSum,
      ...updateTotalWeight,
    },
  }, {
    field: 'order_items_weight',
    updates: updateTotalWeight,
  }, {
    field: 'post_cost',
    updates: {
      ...updatePostCostWithPacket,
      ...updatePostDiscount,
      ...updateTotalPostals,
      ...updateTotalSum,
    },
  }, {
    field: 'packet',
    updates: {
      ...updatePostCostWithPacket,
      ...updatePostDiscount,
      ...updateTotalPostals,
      ...updateTotalSum,
    },
  })
}
