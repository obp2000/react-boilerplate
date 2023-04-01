import type { NextApiRequest, NextApiResponse } from 'next'
import { CustomerApi } from '@/app/customers/customer'
import { assert } from 'superstruct'
import { where } from '@/app/customers/db'
import prisma from '@/services/prisma'
import tables from '@/app/objectPage/tables.json'

// GET/POST /api/customers
export default async function handle(
  { method, body, query }: NextApiRequest,
  { json }: NextApiResponse
) {
  switch (method) {
    case 'GET':
      const objects = await prisma.customer.findMany({
        where: where(query),
        select: tables.customers.select.objects,
      })
      return json(objects)
    case 'POST':
      assert(body, CustomerApi)
      const object = await prisma.customer.create({ data: body })
      return json(object)
    default:
      throw new Error(
        `The HTTP ${method} method is not supported at this route.`
      )
  }
}
