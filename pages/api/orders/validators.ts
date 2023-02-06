import type { Order as OrderType } from '@/app/[lng]/orders/[id]/helpers'
import { Customer } from "@/pages/api/customers/validators"
import { OrderItem } from '@prisma/client'
import type { NextApiRequest } from "next"
import {
    array, assert, integer,
    number, object,
    optional, string
} from 'superstruct'

const OrderItem = object({
  id: optional(integer()),
  product: optional(object({id : integer()})),
  amount: optional(number()),
  price: optional(integer())
})

const OrderItems = array(OrderItem)

export const Order = object({
  post_cost: optional(number()),
  packet: optional(integer()),
  delivery_type: optional(integer()),
  address: string(),
  gift: optional(string()),
  customer: Customer,
  orderItems: optional(OrderItems),
})

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
    amount: amount ? Number(amount) : undefined,
    price: price ? Number(price) : undefined,
  }))
  const data = {
    post_cost: post_cost ? Number(post_cost) : undefined,
    packet: packet ? parseInt(packet) : undefined,
    delivery_type: delivery_type ? parseInt(delivery_type) : undefined,
    address,
    gift,
    customer,
    orderItems: orderItemsData,
  }
  assert(data, Order)
  return data
}
