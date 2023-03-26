import prisma from '@/services/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'
import { assert } from 'superstruct'
import { CustomerApi } from '@/app/customers/customer'

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'PUT':
      assert(req.body, CustomerApi)
      const object = await prisma.customer.update({
        where: { id: Number(req.query.id) },
        data: req.body
      })
      return res.json(object)
    case 'DELETE':
      const deletedObject = await prisma.customer.delete({
        where: { id: Number(req.query.id) }
      })
      return res.json(deletedObject)
    default:
      throw new Error(
        `The HTTP ${req.method} method is not supported at this route.`
      )
  }
}
