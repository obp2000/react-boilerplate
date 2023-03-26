import type { NextApiRequest, NextApiResponse } from 'next'
import { CustomerApi } from '@/app/customers/customer'
import { assert } from 'superstruct'
import { where } from '@/app/customers/db'
import prisma from '@/services/prisma'
import tables from '@/app/objectPage/tables.json'

// GET/POST /api/customers
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET':
      const objects = await prisma.customer.findMany({
        where: where(req.query),
        select: tables.customers.select.objects,
      })
      return res.json(objects)
    case 'POST':
      assert(req.body, CustomerApi)
      const object = await prisma.customer.create({ data: req.body })
      return res.json(object)
    default:
      throw new Error(
        `The HTTP ${req.method} method is not supported at this route.`
      )
  }
}
