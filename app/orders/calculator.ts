import type { UseFormSetValue } from 'react-hook-form'
import consts from './consts.json'
import type { Values, OrderItem } from '@/interfaces/orders'

export function cost({ amount, price }: OrderItem) {
  return amount && price ? Number(amount) * Number(price) : 0
}

export function weight({ amount, product }: OrderItem) {
  // console.log('values ', amount, product)
  return amount && product && product.density && product.width
    ? Number(amount) * Number(product.density) * Number(product.width) / 100
    : 0
}

export function orderItemsAmount(orderItems?: OrderItem[]) {
  return (orderItems || []).reduce(
    (sum: number, { amount }) => {
      sum += Number(amount)
      return sum
    }, 0)
}

export function orderItemsCost(orderItems?: OrderItem[]) {
  return (orderItems || []).reduce(
    (sum: number, { price, amount }) => {
      sum += Number(price * Number(amount))
      return sum
    }, 0)
}

export function orderItemsWeight(orderItems?: OrderItem[]) {
  return (orderItems || []).reduce((
    sum: number, { amount, product }) => {
    sum += Number(amount) * (product?.density || 0) * (product?.width || 0) / 100
    return sum
  }, 0)
}

export function postCostWithPacket({
  postCost,
  packet
}: {
  postCost: Values['postCost']
  packet: Values['packet']
}) {
  return Number(postCost) + Number(packet)
}

export function postDiscount({
  orderItemsValues,
  postCost,
  packet
}: {
  orderItemsValues: Values['orderItems']
  postCost: Values['postCost']
  packet: Values['packet']
}) {
  return orderItemsCost(orderItemsValues) >= consts.SUM_FOR_POST_DISCOUNT
    ? postCostWithPacket({postCost, packet}) * consts.POST_DISCOUNT_PERCENT / 100
    : 0
}

export function totalPostals(values: {
  orderItemsValues: Values['orderItems']
  postCost: Values['postCost']
  packet: Values['packet']
}) {
  return postCostWithPacket(values) - postDiscount(values)
}

export function totalSum({
  orderItemsValues,
  postCost,
  packet
}: {
  orderItemsValues: Values['orderItems']
  postCost: Values['postCost']
  packet: Values['packet']
}) {
  return orderItemsCost(orderItemsValues) +
    totalPostals({ orderItemsValues, postCost, packet })
}

export function needGift(orderItemsValues?: Values['orderItems']) {
  return orderItemsCost(orderItemsValues) >= consts.SUM_FOR_GIFT
}

export function totalWeight(orderItemsValues?: Values['orderItems']) {
  return orderItemsWeight(orderItemsValues) +
    consts.SAMPLES_WEIGHT +
    consts.PACKET_WEIGHT +
    (needGift(orderItemsValues) ? consts.GIFT_WEIGHT : 0)
}

export function postCostCount({
  pindex,
  weight,
  setValue
}: {
  pindex: string
  weight: number
  setValue: UseFormSetValue<Values>
}): void {
  const searchParams = new URLSearchParams({
    from_index: String(process.env.NEXT_PUBLIC_FROM_INDEX),
    to_index: pindex,
    weight: weight.toFixed(0),
  })
  fetch(`${process.env.NEXT_PUBLIC_POST_BASE_URL}?${searchParams}`)
    .then((response) => response.json())
    .then(({ posilka_nds: posilkaNds }) => {
      return setValue('postCost', posilkaNds ?? 0)
    })
    .catch((e) => console.error(e))
}
