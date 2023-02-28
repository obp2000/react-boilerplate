import type { Order as OrderType } from '@/app/orders/calculator'
import type { NextApiRequest } from "next"
import { Order } from '@/app/orders/order'

export function validate({
  body: {
    post_cost,
    packet,
    delivery_type,
    address = '',
    gift = '',
    customer,
    orderItems,
  } }: NextApiRequest) {
  const orderItemsData = orderItems.map(({
    id,
    product,
    amount,
    price
  }: OrderType['orderItems'][number]) => ({
    id,
    product: product ? { id: product.id } : undefined,
    amount: amount ? parseFloat(amount) : undefined,
    price: price ? parseInt(price) : undefined,
  }))
  const data = {
    post_cost: post_cost ? parseFloat(post_cost) : undefined,
    packet: packet === '' ? undefined : parseInt(packet),
    delivery_type: delivery_type === '' ? undefined : parseInt(delivery_type),
    address,
    gift,
    customer,
    orderItems: orderItemsData,
  }
  assert(data, Order)
  return data
}
