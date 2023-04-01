import type { NextApiRequest, NextApiResponse } from 'next'
import { OrderApi } from '@/app/orders/order'
import { create as coerce } from 'superstruct'
import prisma from '@/services/prisma'

export default async function handle(
  { method, body }: NextApiRequest,
  { json }: NextApiResponse
) {
  switch (method) {
    case 'POST':
      const {postCost, orderItems, ...data } = coerce(body, OrderApi)
      const object = await prisma.order.create({
        data: {
          ...data,
          postCost: postCost as number,
          orderItems: { create: orderItems }
        }
      })
      return json(object)
    default:
      throw new Error(
        `The HTTP ${method} method is not supported at this route.`
      )
  }
}
