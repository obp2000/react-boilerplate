import type { Order } from '@/app/[lng]/orders/[id]/helpers'
import prisma from '@/services/prisma'
import { Prisma } from '@prisma/client'
import { Decimal } from '@prisma/client/runtime'
import type { NextApiRequest, NextApiResponse } from 'next'
import { validate } from './validators'

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'PUT':
      const { customer, orderItems = [], ...data } = validate(req)
      const object = await prisma.order.findUnique({
        where: { id: Number(req.query.id) },
        include: { orderItems: true }
      })
      const { newOrderItems, updateOrderItems, deletedOrderItemIds } =
        (orderItems as Order['orderItems']).reduce(
          (result: {
            newOrderItems: Prisma.OrderItemCreateInput[],
            updateOrderItems: Prisma.OrderItemUpdateArgs[]
            deletedOrderItemIds: number[]
          },
            { id, product, amount, price }) => {
            if (id) {
              const index = result.deletedOrderItemIds.indexOf(id)
              if (index > -1) {
                result.deletedOrderItemIds.splice(index, 1)
              }
              result.updateOrderItems.push({
                where: { id },
                data: {
                  product: product
                    ? { connect: { id: product.id as number } }
                    : { disconnect: true },
                  price,
                  amount,
                  updated_at: new Date(),
                }
              })
            }
            else {
              result.newOrderItems.push({
                product: product
                  ? { connect: { id: product.id as number } }
                  : undefined,
                price: price as number,
                amount: amount as Decimal,
                created_at: new Date(),
                updated_at: new Date(),
              })
            }
            return result
          }, {
          newOrderItems: [],
          updateOrderItems: [],
          deletedOrderItemIds: object?.orderItems.map(({ id }) => id) || []
        })
      // console.log('newOrderItems ', newOrderItems)
      const { id: customerId } = customer as Prisma.CustomerWhereUniqueInput
      const updateOrder = {
        where: { id: Number(req.query.id) },
        data: {
          ...data,
          customer: customerId
            ? { connect: { id: customerId } } :
            { disconnect: true },
          updated_at: new Date(),
          orderItems: {
            create: newOrderItems,
            deleteMany: {
              id: {
                in: deletedOrderItemIds
              }
            },
          }
        }
      } as Prisma.OrderUpdateArgs
      // const { id: customerId } = customer as Prisma.CustomerWhereUniqueInput
      const [updatedObject] = await prisma.$transaction(
        [prisma.order.update(updateOrder),
        ...updateOrderItems.map((orderItem) => prisma.orderItem.update(orderItem))
        ]
      )
      res.json(updatedObject)
      break
    case 'DELETE':
      const deletedObject = await prisma.order.delete({
        where: { id: Number(req.query.id) },
      })
      res.json(deletedObject)
      break
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
