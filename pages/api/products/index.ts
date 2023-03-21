import tables from '@/app/objectPage/tables.json'
import { where } from '@/app/products/db'
import { Product } from '@/app/products/product'
import { upload } from '@/services/cloudinary'
import { getData } from '@/services/formidable'
import prisma from '@/services/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'
import { create } from 'superstruct'

export const config = {
  api: {
    bodyParser: false,
  },
}

export async function getObjectData(req: NextApiRequest) {
  const { fields, files: { image } } = await getData(req)
  let data = create(fields, Product)
  if (image) {
    data.image = await upload(image)
  }
  return data
}

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET':
      const objects = await prisma.product.findMany({
        where: where(req.query),
        select: tables.products.select.objects,
      })
      res.json(objects)
      break
    case 'POST':
      const newObject = await prisma.product.create({
        data: await getObjectData(req)
      })
      res.json(newObject)
      break
    default:
      throw new Error(
        `The HTTP ${req.method} method is not supported at this route.`
      )
  }
}
