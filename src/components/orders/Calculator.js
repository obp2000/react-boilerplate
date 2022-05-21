import createDecorator from 'final-form-calculate'
// import {getPostCost} from '../redux/PostCost'

export const postCostWithPacket = (values) =>
  Number(values?.packet) + Number(values?.post_cost)

export const postDiscount = ({
  order_items_cost: orderItemsCost = 0,
  Consts: {
    SUM_FOR_POST_DISCOUNT = 0,
    POST_DISCOUNT_PERCENT = 0,
  } = {},
  ...values
}) => orderItemsCost >= SUM_FOR_POST_DISCOUNT ?
  (postCostWithPacket(values) * POST_DISCOUNT_PERCENT / 100) : 0

export const totalPostals = (values) =>
  postCostWithPacket(values) - postDiscount(values)

export const totalSum = (values) =>
  Number(values?.order_items_cost) + totalPostals(values)

export const needGift = ({
  order_items_cost: orderItemsCost = 0,
  Consts: {
    SUM_FOR_GIFT = 0,
  } = {},
}) => orderItemsCost >= SUM_FOR_GIFT

export const totalWeight = ({
  order_items_weight: orderItemsWeight,
  // order_items_cost,
  Consts: {
    SAMPLES_WEIGHT,
    PACKET_WEIGHT,
    GIFT_WEIGHT,
  } = {},
  ...values
}) => Number(orderItemsWeight) + SAMPLES_WEIGHT + PACKET_WEIGHT +
  (needGift(values) ? GIFT_WEIGHT : 0)

export const orderCalculator = createDecorator(
    {
      field: 'post_cost',
      updates: (_, name, values) => ({
        post_cost_with_packet: postCostWithPacket(values).toFixed(2),
        post_discount: postDiscount(values).toFixed(2),
        total_postals: totalPostals(values).toFixed(2),
        total_sum: totalSum(values).toFixed(2),
      }),
    }, {
      field: 'packet',
      updates: (_, name, values) => ({
        post_cost_with_packet: postCostWithPacket(values).toFixed(2),
        post_discount: postDiscount(values).toFixed(2),
        total_postals: totalPostals(values).toFixed(2),
        total_sum: totalSum(values).toFixed(2),
      }),
    }, {
      field: 'address1',
      updates: (address, name, {
        pindex,
        total_weight: totalWeight,
      }) => ({
        // post_cost: getPostCost(pindex, totalWeight),
      }),
    })
