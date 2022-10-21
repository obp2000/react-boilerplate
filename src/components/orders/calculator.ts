import type { Decorator, Mutator } from 'final-form'
import { getIn } from 'final-form'
import type { Calculation } from 'final-form-calculate'
import createDecorator from 'final-form-calculate'
// const math = require('lodash/math')
import type { OrderItem } from '../../../interfaces/orderItems'
import type { Order } from '../../../interfaces/orders'
import type { Product } from '../../../interfaces/products'

const countCost = ({ amount, price }: Partial<OrderItem>) =>
  amount && price ? Number(amount) * Number(price) : 0

export const cost = (values: Partial<OrderItem>) =>
  countCost(values).toFixed(2)

const countWeight = ({ amount, product }: Partial<OrderItem>) =>
  amount && product
    ? Number(amount) * Number(product?.density) * Number(product?.width) / 100
    : 0

export const weight = (values: Partial<OrderItem>) =>
  countWeight(values).toFixed(0)

// export const sumBy1 = (
//   values: any,
//   field: string
// ): number => math.sumBy(values?.order_items,
//   (oderItem: OrderItemFormValues) =>
//     Number(oderItem[field as keyof OrderItemFormValues] || 0))

export const sumBy = (
  values: Partial<Order>,
  field: string
): number => (values?.order_items || [])
  .reduce((sum: number, oderItem: OrderItem) => {
    let fieldValue = oderItem[field as keyof OrderItem] === 'NaN'
      ? 0
      : oderItem[field as keyof OrderItem]
    sum += Number(fieldValue)
    return sum
  }, 0)

export const orderItemsAmount = (_: null, values: any) =>
  sumBy(values, 'amount').toFixed(2)

export const orderItemsCost = (_: null, values: any) =>
  sumBy(values, 'cost').toFixed(2)

export const orderItemsWeight = (_: null, values: any) =>
  sumBy(values, 'weight')

export const postCostWithPacket = (_: null, values: any) =>
  (Number(values?.post_cost) + Number(values?.packet)).toFixed(2)

const needPostDiscount = (values: Partial<Order>) =>
  Number(values?.order_items_cost) >=
  Number(values?.consts?.SUM_FOR_POST_DISCOUNT)

export const postDiscount = (_: null, values: Partial<Order>) =>
  (needPostDiscount(values) ?
    Number(postCostWithPacket(null, values)) *
    Number(values?.consts?.POST_DISCOUNT_PERCENT) / 100 : 0).toFixed(2)

export const totalPostals = (_: null, values: Partial<Order>) =>
  (Number(postCostWithPacket(null, values)) -
    Number(postDiscount(null, values))).toFixed(2)

export const totalSum = (_: null, values: any) =>
  (Number(values?.order_items_cost) +
    Number(totalPostals(null, values))).toFixed(2)

export const needGift = (values: Partial<Order>): boolean =>
  Number(values?.order_items_cost) >= Number(values?.consts?.SUM_FOR_GIFT)

export const totalWeight = (_: null, values: Partial<Order>) =>
  Number(values?.order_items_weight) +
  Number(values?.consts?.SAMPLES_WEIGHT) +
  Number(values?.consts?.PACKET_WEIGHT) +
  (needGift(values) ? Number(values?.consts?.GIFT_WEIGHT) : 0)

const makeOrderItem =
  (name: string,
    field: string,
    values?: Object,
  ) => ({
    amount: getIn(values || {}, name.replace(`.${field}`, '.amount')),
    price: getIn(values || {}, name.replace(`.${field}`, '.price')),
    product: getIn(values || {}, name.replace(`.${field}`, '.product')),
  })

const orderItemsRegExp = (field: string): RegExp =>
  new RegExp(`order_items\\[\\d+\\]\\.${field}`)

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
    if (value) {
      const orderItem = makeOrderItem(name, 'product', values)
      return {
        [name.replace('.product', '.price')]: value.price,
        [name.replace('.product', '.weight')]: weight(orderItem),
      }
    } else {
      return {}
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

export const calculator: Decorator = createDecorator(...calculations)

export const postCostCount: Mutator = (_, state,
  {
    getIn,
    changeValue,
    resetFieldState
  }
): void => {
  const pindex = getIn(state, 'formState.values.customer.city.pindex')
  const totalWeight = getIn(state, 'formState.values.total_weight')
  const postBaseUrl = 'http://api.print-post.com/api/sendprice/v2/'

  const params = new URLSearchParams()
  params.set('from_index', '153038')
  params.set('to_index', pindex)
  params.set('weight', totalWeight)

  fetch(`${postBaseUrl}?${params.toString()}`)
    .then((response) => response.json())
    .then(({ posilka_nds: posilkaNds }) => {
      changeValue(state, 'post_cost', () => posilkaNds ?? 0)
      resetFieldState('post_cost')
      return state.fields['post_cost'].focus()
    })
    .catch((e) => console.error(e))
}
