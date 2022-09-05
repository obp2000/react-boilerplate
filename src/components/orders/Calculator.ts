import {getIn} from 'final-form'
import createDecorator from 'final-form-calculate'
import type {Calculation} from 'final-form-calculate'
import type {Decorator} from 'final-form'
const math = require('lodash/math')
import {
  OrderFormValues,
  OrderItemFormValues,
  Product,
} from '../../../interfaces'

// const emptyObject = {}

const countCost = ({
  amount,
  price,
}: OrderItemFormValues): number => Number(amount) * Number(price)

export const cost = (values: OrderItemFormValues): string =>
  countCost(values).toFixed(2)

const countWeight = ({ amount = 0, product }: OrderItemFormValues): number =>
  amount * Number(product?.density) * Number(product?.width) / 100

export const weight = (values: OrderItemFormValues): string =>
  countWeight(values).toFixed(0)

export const sumBy = (
  values: any,
  field: string
): number => math.sumBy(values?.order_items || [],
  (oderItem: OrderItemFormValues) =>
    Number(oderItem[field as keyof OrderItemFormValues]))

export const orderItemsAmount = (_: null, values: any): string =>
  sumBy(values, 'amount').toFixed(2)

export const orderItemsCost = (_: null, values: any): string =>
  sumBy(values, 'cost').toFixed(2)

export const orderItemsWeight = (_: null, values: any): number =>
  sumBy(values, 'weight')

export const postCostWithPacket = (_: null, values: any): string =>
  (Number(values?.post_cost) + Number(values?.packet)).toFixed(2)

const needPostDiscount = (values: OrderFormValues): boolean =>
  Number(values?.order_items_cost) >= values?.consts?.SUM_FOR_POST_DISCOUNT

export const postDiscount = (_: null, values: OrderFormValues): string =>
  (needPostDiscount(values) ?
    Number(postCostWithPacket(null, values)) *
    Number(values?.consts?.POST_DISCOUNT_PERCENT) / 100 : 0).toFixed(2)

export const totalPostals = (_: null, values: OrderFormValues): string =>
  (Number(postCostWithPacket(null, values)) -
    Number(postDiscount(null, values))).toFixed(2)

export const totalSum = (_: null, values: any): string =>
  (Number(values?.order_items_cost) +
    Number(totalPostals(null, values))).toFixed(2)

export const needGift = (values: OrderFormValues): boolean =>
  Number(values?.order_items_cost) >= values?.consts?.SUM_FOR_GIFT

export const totalWeight = (_: null, values: OrderFormValues): number =>
  Number(values?.order_items_weight) +
  Number(values?.consts?.SAMPLES_WEIGHT) +
  Number(values?.consts?.PACKET_WEIGHT) +
  (needGift(values) ? Number(values?.consts?.GIFT_WEIGHT) : 0)

const makeOrderItem =
  (name: string,
    field: string,
    values?: Object,
  ): OrderItemFormValues => ({
    amount: getIn(values || {}, name.replace(`.${field}`, '.amount')),
    price: getIn(values || {}, name.replace(`.${field}`, '.price')),
    product: getIn(values || {}, name.replace(`.${field}`, '.product')),
  })

const orderItemsRegExp = (field: string): RegExp =>
  new RegExp(`order_items\\[\\d+\\]\\.${field}`)

export const calculator = (options): Decorator => {
  // console.log('order Consts ', orderConsts)

  const updatePostCostWithPacket = {
    post_cost_with_packet: postCostWithPacket,
  }

  const updatePostDiscount = {
    post_discount: (_: null, values: any) =>
      postDiscount(null, values)
  }

  const updateTotalPostals = {
    total_postals: (_: null, values: any) =>
      totalPostals(null, values)
  }

  const updateTotalSum = {
    total_sum: (_: null, values: any) =>
      totalSum(null, values)
  }

  const updateTotalWeight = {
    total_weight: (_: null, values: any) =>
      totalWeight(null, values)
  }


  const onChangeOrderItemAmount = {
    field: orderItemsRegExp('amount'),
    updates: (_: null, name: string, values: any) => {
      const orderItem = makeOrderItem(name, 'amount', values)
      return {
        [name.replace('.amount', '.cost')]: cost(orderItem),
        [name.replace('.amount', '.weight')]: weight(orderItem),
      }
    },
  }

  const onChangeOrderItemPrice = {
    field: orderItemsRegExp('price'),
    updates: (_: null, name: string, values: any) => {
      const orderItem = makeOrderItem(name, 'price', values)
      return {
        [name.replace('.price', '.cost')]: cost(orderItem),
      }
    },
  }

  const onChangeOrderItemProduct = {
    field: orderItemsRegExp('product'),
    updates: (value: Product, name: string, values: any) => {
      const orderItem = makeOrderItem(name, 'product', values)
      return {
        [name.replace('.product', '.price')]: value?.price,
        [name.replace('.product', '.weight')]: weight(orderItem),
      }
    },
  }

  const onChangeOrderItemAmount2 = {
    field: orderItemsRegExp('amount'),
    updates: {
      order_items_amount: orderItemsAmount,
    },
  }

  const onChangeOrderItemCost = {
    field: orderItemsRegExp('cost'),
    updates: {
      order_items_cost: orderItemsCost,
    },
  }

  const onChangeOrderItemWeight = {
    field: orderItemsRegExp('weight'),
    updates: {
      order_items_weight: orderItemsWeight,
    },
  }

  const onChangeOrderItemsCost = {
    field: 'order_items_cost',
    updates: {
      ...updatePostDiscount,
      ...updateTotalPostals,
      ...updateTotalSum,
      ...updateTotalWeight,
    },
  }

  const onChangeOrderItemsWeight = {
    field: 'order_items_weight',
    updates: updateTotalWeight,
  }

  const onChangePostCost = {
    field: 'post_cost',
    updates: {
      ...updatePostCostWithPacket,
      ...updatePostDiscount,
      ...updateTotalPostals,
      ...updateTotalSum,
    },
  }

  const onChangePacket = {
    field: 'packet',
    updates: {
      ...updatePostCostWithPacket,
      ...updatePostDiscount,
      ...updateTotalPostals,
      ...updateTotalSum,
    },
  }

  const calculations: Calculation[] = [
    onChangeOrderItemAmount,
    onChangeOrderItemPrice,
    onChangeOrderItemProduct,
    onChangeOrderItemAmount2,
    onChangeOrderItemCost,
    onChangeOrderItemWeight,
    onChangeOrderItemsCost,
    onChangeOrderItemsWeight,
    onChangePostCost,
    onChangePacket,
  ]

  return createDecorator(...calculations)
}
