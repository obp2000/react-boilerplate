import prisma from '@/services/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'
import { assert } from 'superstruct'
import { CustomerApi } from '@/app/customers/customer'

export default async function handle(
  { method, body, query }: NextApiRequest,
  { json }: NextApiResponse
) {
  const id = Number(query.id)
  switch (method) {
    case 'PUT':
      assert(body, CustomerApi)
      const object = await prisma.customer.update({
        where: { id },
        data: body
      })
      return json(object)
    case 'DELETE':
      const deletedObject = await prisma.customer.delete({
        where: { id }
      })
      return json(deletedObject)
    default:
      throw new Error(
        `The HTTP ${method} method is not supported at this route.`
      )
  }
}
