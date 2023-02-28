import { where } from '@/app/products/serverHelpers'
import select from '@/app/products/select.json'
import prisma from '@/services/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'
import { validate } from './validators'

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET':
      const objects = await prisma.product.findMany({
        where: where(req.query),
        select: select.objects,
      })
      res.json(objects)
      break
    case 'POST':
      const { product_type_id, ...data } = await validate(req)
      const newObject = await prisma.product.create({
        data: {
          ...data,
          productType: product_type_id
            ? { connect: { id: product_type_id } }
            : undefined,
          created_at: new Date(),
          updated_at: new Date(),
        },
      })
      res.json(newObject)
      break
    default:
      throw new Error(
        `The HTTP ${req.method} method is not supported at this route.`
      )
  }
}
