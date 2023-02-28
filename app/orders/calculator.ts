// import type { Order } from '@/app/orders/[id]/helpers'
import { Prisma } from '@prisma/client'
// import type { Mutator } from 'final-form'
// import { getIn } from 'final-form'
// import type { Calculation } from 'final-form-calculate'
// import createDecorator from 'final-form-calculate'
import consts from './consts.json'
import select from './select.json'

export type Order = Prisma.OrderGetPayload<{ select: typeof select.object }>

export type Values = (Prisma.OrderCreateArgs['data'] |
  Prisma.OrderUpdateArgs['data']) & {
    samples_weight?: number
    packet_weight?: number
    gift_weight?: number
    order_items_amount?: string
    order_items_cost?: string
    order_items_weight?: number
    post_cost_with_packet?: string
    post_discount?: string
    total_postals?: string
    total_sum?: string
    total_weight?: number
  }

const countCost = ({ amount, price }: Order['orderItems'][number]) =>
  amount && price ? Number(amount) * Number(price) : 0

export const cost = (values: Order['orderItems'][number]) =>
  countCost(values).toFixed(2)

const countWeight = ({
  amount,
  product
}: Order['orderItems'][number]) =>
  amount && product
    ? Number(amount) * Number(product?.density) * Number(product?.width) / 100
    : 0

export const weight = (values: Order['orderItems'][number]) =>
  countWeight(values).toFixed(0)

export const sumBy11 = (
  field: string,
  values?: Values,
): number => (values?.orderItems as Order['orderItems'] || [])
  .reduce((sum, oderItem) => {
    let fieldValue = oderItem[field as keyof Order['orderItems'][number]]
    sum += Number(fieldValue)
    return sum
  }, 0)

export const sumBy = (
  field: string,
  orderItems: Order['orderItems'] = [],
): number => (orderItems || []).reduce((sum, oderItem) => {
  let fieldValue = oderItem[field as keyof Order['orderItems'][number]]
  sum += Number(fieldValue)
  return sum
}, 0)

export const orderItemsAmount11 = (orderItems?: Order['orderItems']) =>
  sumBy('amount', orderItems).toFixed(2)

export function orderItemsAmount(orderItems?: Order['orderItems']) {
  return (orderItems || []).reduce((sum, { amount }) => {
    sum += Number(amount)
    return sum
  }, 0).toFixed(2)
}

export function orderItemsCost(orderItems?: Order['orderItems']) {
  return (orderItems || []).reduce((sum, { price, amount }) => {
    sum += Number(price * amount)
    return sum
  }, 0).toFixed(2)
}

export function orderItemsWeight(orderItems?: Order['orderItems']) {
  return (orderItems || []).reduce((sum, { amount, product }) => {
    sum += Number(amount * (product?.density || 0) * (product?.width || 0) / 100)
    return sum
  }, 0).toFixed(0)
}



export const orderItemsCost11 = (orderItems?: Order['orderItems']) =>
  sumBy('cost', orderItems).toFixed(2)

export const orderItemsWeight11 = (orderItems?: Order['orderItems']) =>
  sumBy('weight', orderItems)

export const postCostWithPacket = (_: null, values?: Values) =>
  (Number(values?.post_cost) + Number(values?.packet)).toFixed(2)

const needPostDiscount = (values?: Values) =>
  Number(values?.order_items_cost) >=
  Number(consts.SUM_FOR_POST_DISCOUNT)

export const postDiscount = (_: null, values?: Values) =>
  (needPostDiscount(values) ?
    Number(postCostWithPacket(null, values)) *
    Number(consts.POST_DISCOUNT_PERCENT) / 100 : 0).toFixed(2)

export const totalPostals = (_: null, values?: Values) =>
  (Number(postCostWithPacket(null, values)) -
    Number(postDiscount(null, values))).toFixed(2)

export const totalSum = (_: null, values?: Values) =>
  (Number(values?.order_items_cost) +
    Number(totalPostals(null, values))).toFixed(2)

export const needGift = (values?: Values): boolean =>
  Number(values?.order_items_cost) >= Number(consts.SUM_FOR_GIFT)

export const totalWeight = (_: null, values?: Values) =>
  Number(values?.order_items_weight) +
  Number(consts.SAMPLES_WEIGHT) +
  Number(consts.PACKET_WEIGHT) +
  (needGift(values) ? Number(consts.GIFT_WEIGHT) : 0)

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
  new RegExp(`orderItems\\[\\d+\\]\\.${field}`)

const updatePostCostWithPacket = {
  post_cost_with_packet: postCostWithPacket,
}

const updatePostDiscount = {
  post_discount: (_: null, values?: Values) =>
    postDiscount(null, values)
}

const updateTotalPostals = {
  total_postals: (_: null, values?: Values) =>
    totalPostals(null, values)
}

const updateTotalSum = {
  total_sum: (_: null, values?: Values) =>
    totalSum(null, values)
}

const updateTotalWeight = {
  total_weight: (_: null, values?: Values) =>
    totalWeight(null, values)
}

const onChangeOrderItemAmount = {
  field: orderItemsRegExp('amount'),
  updates: (_: null, name: string, values?: Values) => {
    const orderItem = makeOrderItem(name, 'amount', values) as Order['orderItems'][number]
    return {
      [name.replace('.amount', '.cost')]: cost(orderItem),
      [name.replace('.amount', '.weight')]: weight(orderItem),
    }
  },
}

const onChangeOrderItemPrice = {
  field: orderItemsRegExp('price'),
  updates: (_: null, name: string, values?: Values) => {
    const orderItem = makeOrderItem(name, 'price', values) as Order['orderItems'][number]
    return {
      [name.replace('.price', '.cost')]: cost(orderItem),
    }
  },
}

const onChangeOrderItemProduct = {
  field: orderItemsRegExp('product'),
  updates: (value: Order['orderItems'][number]['product'], name: string, values?: Values) => {
    if (value) {
      const orderItem = makeOrderItem(name, 'product', values) as Order['orderItems'][number]
      return {
        // [name.replace('.product', '.price')]: value.price,
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

export const calculations = [
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

export function postCostCount({
    pindex,
    weight,
    setValue
  }: {
    pindex: string
    weight: string
  }): void {
  const postBaseUrl = 'http://api.print-post.com/api/sendprice/v2/'

  const params = new URLSearchParams()
  params.set('from_index', '153038')
  params.set('to_index', pindex)
  params.set('weight', weight)

  fetch(`${postBaseUrl}?${params.toString()}`)
    .then((response) => response.json())
    .then(({ posilka_nds: posilkaNds }) => {
      // changeValue(state, 'post_cost', () => posilkaNds ?? 0)
      return setValue('post_cost', posilkaNds ?? 0)
      // resetFieldState('post_cost')
      // return state.fields['post_cost'].focus()
    })
    .catch((e) => console.error(e))
}

// export const calculations: Calculation[] = [
//   onChangeOrderItemAmount,
//   onChangeOrderItemPrice,
//   onChangeOrderItemProduct,
//   onChangeOrderItemAmount2,
//   onChangeOrderItemCost,
//   onChangeOrderItemWeight,
//   onChangeOrderItemsCost,
//   onChangeOrderItemsWeight,
//   onChangePostCost,
//   onChangePacket,
// ]

// export const calculator = createDecorator(...calculations)

// export const decorators = [calculator]

// export const postCostCount: Mutator<Values> = (_, state,
//   {
//     getIn,
//     changeValue,
//     resetFieldState
//   }
// ): void => {
//   const pindex = getIn(state, 'formState.values.customer.city.pindex')
//   const totalWeight = getIn(state, 'formState.values.total_weight')
//   const postBaseUrl = 'http://api.print-post.com/api/sendprice/v2/'

//   const params = new URLSearchParams()
//   params.set('from_index', '153038')
//   params.set('to_index', pindex)
//   params.set('weight', totalWeight)

//   fetch(`${postBaseUrl}?${params.toString()}`)
//     .then((response) => response.json())
//     .then(({ posilka_nds: posilkaNds }) => {
//       changeValue(state, 'post_cost', () => posilkaNds ?? 0)
//       resetFieldState('post_cost')
//       return state.fields['post_cost'].focus()
//     })
//     .catch((e) => console.error(e))
// }


// export type Order = Prisma.OrderGetPayload<{ select: typeof select }>

// type Test1 = Order['product']

// export type ProductValues = Prisma.ProductCreateArgs['data'] |
//   Prisma.ProductUpdateArgs['data']

// export type OrderItemValues = (Prisma.OrderItemCreateWithoutProductInput |
//   Prisma.OrderItemUpdateWithoutProductInput) & { product?: ProductValues }

// export type Values22 = Omit<Prisma.OrderCreateArgs['data'] |
//   Prisma.OrderUpdateArgs['data'], 'orderItems'> &
// { orderItems?: OrderItemValues[] } & OrderCalcValues
