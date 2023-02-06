import prisma from '@/services/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'
import { validate } from './validators'

// PUT/DELETE /api/customers/:id
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'PUT':
      const { city, ...data } = validate(req)
      const object = await prisma.customer.update({
        where: { id: Number(req.query.id) },
        data: {
          ...data,
          city: city ? { connect: { id: city.id } } : { disconnect: true },
          updated_at: new Date(),
        },
      })
      res.json(object)
      // console.log('updatedObject ', updatedObject)
      break
    case 'DELETE':
      const deletedObject = await prisma.customer.delete({
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
