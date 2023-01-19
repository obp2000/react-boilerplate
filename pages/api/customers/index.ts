import { where } from '@/app/[lng]/customers/helpers'
import select from '@/app/[lng]/customers/select.json'
import prisma from '@/services/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'
import { create } from 'superstruct'
import { Customer } from './customer'

// GET/POST /api/customers
export default async function handle({
  method,
  query,
  body
}: NextApiRequest, res: NextApiResponse) {
  switch (method) {
    case 'GET':
      const objects = await prisma.customer.findMany({
        where: where(query),
        select,
      })
      res.json(objects)
      break
    case 'POST':
      create(body, Customer)
      const object = await prisma.customer.create({
        data: {
          ...body,
          city: body.city ? { connect: { id: body.city.id } } : { disconnect: true },
          created_at: new Date(),
          updated_at: new Date(),
        },
      })
      res.json(object)
      break
    default:
      throw new Error(
        `The HTTP ${method} method is not supported at this route.`
      )
  }
}
