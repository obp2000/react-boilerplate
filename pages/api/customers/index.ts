import { where } from '@/app/customers/serverHelpers'
import select from '@/app/customers/select.json'
import prisma from '@/services/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'
import { validate } from './validators'

// GET/POST /api/customers
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET':
      const objects = await prisma.customer.findMany({
        where: where(req.query),
        select: select.objects,
      })
      res.json(objects)
      break
    case 'POST':
      const { city, ...data } = validate(req)
      const object = await prisma.customer.create({
        data: {
          ...data,
          city: city ? { connect: { id: city.id } } : undefined,
          created_at: new Date(),
          updated_at: new Date(),
        },
      })
      res.json(object)
      break
    default:
      throw new Error(
        `The HTTP ${req.method} method is not supported at this route.`
      )
  }
}
