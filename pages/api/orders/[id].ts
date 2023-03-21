import type { NextApiRequest, NextApiResponse } from 'next'
import { Order } from '@/app/orders/order'
import { create as coerce } from 'superstruct'
import prisma from '@/services/prisma'
import type { NewOrderItem, OrderItemUpdate } from '@/interfaces/orders'

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'PUT':
      const { postCost, orderItems = [], ...data } = coerce(req.body, Order)
      const object = await prisma.order.findUnique({
        where: { id: Number(req.query.id) },
        include: { orderItems: true }
      })
      const { newOrderItems, updateOrderItems, deletedOrderItemIds } =
        orderItems.reduce(
          (result: {
            newOrderItems: NewOrderItem[],
            updateOrderItems: OrderItemUpdate[],
            deletedOrderItemIds: number[]
          },
            { id, ...data }) => {
            if (id) {
              const index = result.deletedOrderItemIds.indexOf(id)
              if (index > -1) {
                result.deletedOrderItemIds.splice(index, 1)
              }
              result.updateOrderItems.push({
                where: { id },
                data
              })
            }
            else {
              result.newOrderItems.push(data)
            }
            return result
          }, {
          newOrderItems: [],
          updateOrderItems: [],
          deletedOrderItemIds: object?.orderItems.map(({ id }) => id) || []
        })
      const [updatedObject] = await prisma.$transaction(
        [prisma.order.update({
          where: { id: Number(req.query.id) },
          data: {
            ...data,
            postCost: postCost as number,
            orderItems: {
              create: newOrderItems,
              deleteMany: {
                id: {
                  in: deletedOrderItemIds
                }
              },
            }
          }
        }),
        ...updateOrderItems.map((orderItem) =>
          prisma.orderItem.update(orderItem))
        ]
      )
      return res.json(updatedObject)
    case 'DELETE':
      const deletedObject = await prisma.order.delete({
        where: { id: Number(req.query.id) },
      })
      return res.json(deletedObject)
    default:
      throw new Error(
        `The HTTP ${req.method} method is not supported at this route.`
      )
  }
}



      // const existingOrderItems = orderItems.filter(({ id }) => !!id)

      // if (object?.orderItems) {
      //   const existingOrderItemIds = existingOrderItems.map(({ id }) => id)
      //   deletedOrderItemIds = object.orderItems.reduce(
      //     (ids: number[], { id }) => {
      //       if (!existingOrderItemIds.includes(id)) {
      //         ids.push(id)
      //       }
      //       return ids
      //     }, [])
      // }
      // (object?.orderItems? || []).map(({ id }) => id) - existingOrderItems.map(({ id }) => id)


        // ...newOrderItems.map(({ product, amount, price }: OrderItemSelect) =>
        //   prisma.orderItem.create({
        //     data: {
        //       order: { connect: { id: Number(req.query.id) } },
        //       product: product
        //         ? { connect: { id: product.id } }
        //         : undefined,
        //       price,
        //       amount,
        //       created_at: new Date(),
        //       updated_at: new Date(),
        //     },
        //   })),
