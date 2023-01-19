import { OrderItemSelect, OrderSelect } from '@/interfaces/api'
import prisma from '@/services/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'
import { assert } from 'superstruct'
import { Order } from './order'

export default async function handle({
  method,
  query: {
    id
  },
  body
}: NextApiRequest, res: NextApiResponse) {
  switch (method) {
    case 'PUT':
      const {
        post_cost,
        packet,
        delivery_type,
        address,
        gift,
        customer,
        orderItems,
      } = body
      const data = {
        post_cost: post_cost ? Number(String(post_cost)) : undefined,
        packet: packet ? parseInt(String(packet)) : undefined,
        delivery_type: delivery_type ? parseInt(String(delivery_type)) : undefined,
        address: address || '',
        gift: gift || '',
        // customer: customer ? { connect: { id: customer.id } } : { disconnect: true },
        // updated_at: new Date(),
        orderItems,
      }
      assert(data, Order)
      // const newOrderItems = orderItems.filter(({ id }: OrderItemSelect) => !id)
      const object: OrderSelect | null = await prisma.order.findUnique({
        where: { id: Number(id) },
      })
      let deletedOrderItems: OrderItemSelect[] = []
      // let updatedOrderItems: OrderItemSelect[] = []
      if (object?.orderItems) {
        const existingOrderItems = orderItems.filter(({ id }: OrderItemSelect) => !!id)
        const existingOrderItemIds = existingOrderItems.map(({ id }: OrderItemSelect) => id)
        deletedOrderItems = object.orderItems.filter(({ id }) => !existingOrderItemIds.includes(id))
        // updatedOrderItems = object.orderItems.filter(({ product, price, amount }) =>
        //   !existingOrderItemIds.includes(id))
      }
      // (object?.orderItems? || []).map(({ id }) => id) - existingOrderItems.map(({ id }) => id)
      const [updatedObject, updatedOrderItems] = await prisma.$transaction(
        [prisma.order.update({
          where: { id: Number(id) },
          data: {
            ...data,
            customer: customer ? { connect: { id: customer.id } } : { disconnect: true },
            updated_at: new Date(),
            orderItems: {
              // createMany: { data: newOrderItems },
              deleteMany: deletedOrderItems,
            }
          },
        }),
        ...orderItems.map(({ id, product, amount, price }: OrderItemSelect) =>
          prisma.orderItem.upsert({
            where: { id },
            update: {
              product: product
                ? { connect: { id: product.id } }
                : { disconnect: true },
              price,
              amount,
              updated_at: new Date(),
            },
            create: {
              product: { connect: { id: product?.id } },
              price,
              amount,
              created_at: new Date(),
              updated_at: new Date()
            }
          }))]
      )
      res.json(updatedObject)
      // console.log('updatedObject ', updatedObject)
      break
    case 'DELETE':
      const deletedObject = await prisma.order.delete({
        where: { id: Number(id) },
      })
      res.json(deletedObject)
      break
    default:
      throw new Error(
        `The HTTP ${method} method is not supported at this route.`
      )
  }
}
