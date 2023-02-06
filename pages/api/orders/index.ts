import type { Order } from '@/app/[lng]/orders/[id]/helpers'
import prisma from '@/services/prisma'
import { Prisma } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { validate } from './validators'

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'POST':
      const { customer, orderItems = [], ...data } = validate(req)
      const newOrderItems = (orderItems as Order['orderItems']).map(
        ({ product, amount, price }) => ({
          product: product ? { connect: { id: product.id } } : undefined,
          price,
          amount,
          created_at: new Date(),
          updated_at: new Date(),
        }))

      const { id: customerId } = customer as Prisma.CustomerWhereUniqueInput
      const createOrder = {
        data: {
          ...data,
          customer: customerId ? { connect: { id: customerId } } : undefined,
          created_at: new Date(),
          updated_at: new Date(),
          orderItems: {
            create: newOrderItems,
          }
        }
      } as Prisma.OrderCreateArgs
      const createdObject = prisma.order.create(createOrder)
      res.json(createdObject)
      break
    default:
      throw new Error(
        `The HTTP ${req.method} method is not supported at this route.`
      )
  }
}
