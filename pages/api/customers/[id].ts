import prisma from '@/services/prisma'
// import { Prisma } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { create } from 'superstruct'
import { Customer } from './customer'

// type Data = Prisma.CustomerUpdateArgs['data']

// PUT/DELETE /api/customers/:id
export default async function handle({
  method,
  query: {
    id
  },
  body
}: NextApiRequest, res: NextApiResponse) {
  switch (method) {
    case 'PUT':
      create(body, Customer)
      const object = await prisma.customer.update({
        where: { id: Number(id) },
        data: {
          ...body,
          city: body.city ? { connect: { id: body.city.id } } : { disconnect: true },
          updated_at: new Date(),
        },
      })
      res.json(object)
      // console.log('updatedObject ', updatedObject)
      break
    case 'DELETE':
      const deletedObject = await prisma.customer.delete({
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
