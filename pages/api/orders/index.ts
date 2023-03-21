import type { NextApiRequest, NextApiResponse } from 'next'
import { Order } from '@/app/orders/order'
import { create as coerce } from 'superstruct'
import prisma from '@/services/prisma'

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'POST':
      const {postCost, orderItems, ...data } = coerce(req.body, Order)
      const object = await prisma.order.create({
        data: {
          ...data,
          postCost: postCost as number,
          orderItems: { create: orderItems }
        }
      })
      return res.json(object)
    default:
      throw new Error(
        `The HTTP ${req.method} method is not supported at this route.`
      )
  }
}
