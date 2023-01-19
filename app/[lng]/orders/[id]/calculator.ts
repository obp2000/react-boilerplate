import {
  OrderCalcValues,
  OrderItemSelect,
  OrderSelect,
  ProductSelect
} from '@/interfaces/api'
import { Prisma } from '@prisma/client'
import type { Mutator } from 'final-form'
import { getIn } from 'final-form'
import type { Calculation } from 'final-form-calculate'
import consts from './consts.json'
import { formInitialOrderItems } from './orderItems/config'

export type Values = (Omit<(Prisma.OrderCreateArgs['data'] |
  Prisma.OrderUpdateArgs['data']), 'orderItems' | 'customer'> &
  { orderItems?: OrderItemSelect[] } &
  OrderCalcValues) | undefined

const countCost = ({ amount, price }: Partial<OrderItemSelect>) =>
  amount && price ? Number(amount) * Number(price) : 0

export const cost = (values: Partial<OrderItemSelect>) =>
  countCost(values).toFixed(2)

const countWeight = ({ amount, product }: Partial<OrderItemSelect>) =>
  amount && product
    ? Number(amount) * Number(product?.density) * Number(product?.width) / 100
    : 0

export const weight = (values: Partial<OrderItemSelect>) =>
  countWeight(values).toFixed(0)

export const sumBy = (
  values: Values,
  field: string
): number => (values?.orderItems || [])
  .reduce((sum, oderItem) => {
    let fieldValue = oderItem[field as keyof OrderItemSelect]
    sum += Number(fieldValue)
    return sum
  }, 0)

export const orderItemsAmount = (_: null, values: Values) =>
  sumBy(values, 'amount').toFixed(2)

export const orderItemsCost = (_: null, values: Values) =>
  sumBy(values, 'cost').toFixed(2)

export const orderItemsWeight = (_: null, values: Values) =>
  sumBy(values, 'weight')

export const postCostWithPacket = (_: null, values: Values) =>
  (Number(values?.post_cost) + Number(values?.packet)).toFixed(2)

const needPostDiscount = (values: Values) =>
  Number(values?.order_items_cost) >=
  Number(consts.SUM_FOR_POST_DISCOUNT)

export const postDiscount = (_: null, values: Values) =>
  (needPostDiscount(values) ?
    Number(postCostWithPacket(null, values)) *
    Number(consts.POST_DISCOUNT_PERCENT) / 100 : 0).toFixed(2)

export const totalPostals = (_: null, values: Values) =>
  (Number(postCostWithPacket(null, values)) -
    Number(postDiscount(null, values))).toFixed(2)

export const totalSum = (_: null, values: Values) =>
  (Number(values?.order_items_cost) +
    Number(totalPostals(null, values))).toFixed(2)

export const needGift = (values: Values): boolean =>
  Number(values?.order_items_cost) >= Number(consts.SUM_FOR_GIFT)

export const totalWeight = (_: null, values: Values) =>
  Number(values?.order_items_weight) +
  Number(consts.SAMPLES_WEIGHT) +
  Number(consts.PACKET_WEIGHT) +
  (needGift(values) ? Number(consts.GIFT_WEIGHT) : 0)

const makeOrderItem =
  (name: string,
    field: string,
    values?: Object,
  ): Partial<OrderItemSelect> => ({
    amount: getIn(values || {}, name.replace(`.${field}`, '.amount')),
    price: getIn(values || {}, name.replace(`.${field}`, '.price')),
    product: getIn(values || {}, name.replace(`.${field}`, '.product')),
  })

const orderItemsRegExp = (field: string): RegExp =>
  new RegExp(`orderItems\\[\\d+\\]\\.${field}`)

const updatePostCostWithPacket = {
  post_cost_with_packet: postCostWithPacket,
}

const updatePostDiscount = {
  post_discount: (_: null, values: Values) =>
    postDiscount(null, values)
}

const updateTotalPostals = {
  total_postals: (_: null, values: Values) =>
    totalPostals(null, values)
}

const updateTotalSum = {
  total_sum: (_: null, values: Values) =>
    totalSum(null, values)
}

const updateTotalWeight = {
  total_weight: (_: null, values: Values) =>
    totalWeight(null, values)
}

const onChangeOrderItemAmount = {
  field: orderItemsRegExp('amount'),
  updates: (_: null, name: string, values: Values) => {
    const orderItem = makeOrderItem(name, 'amount', values)
    return {
      [name.replace('.amount', '.cost')]: cost(orderItem),
      [name.replace('.amount', '.weight')]: weight(orderItem),
    }
  },
}

const onChangeOrderItemPrice = {
  field: orderItemsRegExp('price'),
  updates: (_: null, name: string, values: Values) => {
    const orderItem = makeOrderItem(name, 'price', values)
    return {
      [name.replace('.price', '.cost')]: cost(orderItem),
    }
  },
}

const onChangeOrderItemProduct = {
  field: orderItemsRegExp('product'),
  updates: (value: ProductSelect, name: string, values: Values) => {
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

export const calculations: Calculation[] = [
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

// export const calculator = createDecorator(...calculations)

export const postCostCount: Mutator<Values> = (_, state,
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

export const getInitialValues = ({
  object
}: { object?: OrderSelect | null }) => {
  let { created_at, orderItems, ...objectValues } = object ?? {}
  // objectMod.orderItems = formInitialOrderItems(object?.orderItems)
  // const orderItems = {
  //   orderItems: formInitialOrderItems(object?.orderItems),
  // }
  objectValues = {
    ...objectValues,
    orderItems: formInitialOrderItems(orderItems),
  }
  objectValues = {
    ...objectValues,
    // consts: options?.Consts,
    samples_weight: consts.SAMPLES_WEIGHT,
    packet_weight: consts.PACKET_WEIGHT,
    gift_weight: consts.GIFT_WEIGHT,
    order_items_amount: orderItemsAmount(null, objectValues),
    order_items_cost: orderItemsCost(null, objectValues),
    order_items_weight: orderItemsWeight(null, objectValues),
  }
  objectValues = {
    ...objectValues,
    post_cost_with_packet: postCostWithPacket(null, objectValues),
    post_discount: postDiscount(null, objectValues),
    total_postals: totalPostals(null, objectValues),
  }
  return {
    ...objectValues,
    total_sum: totalSum(null, objectValues),
    total_weight: totalWeight(null, objectValues),
  }
}
