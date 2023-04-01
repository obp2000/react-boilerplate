import tables from '@/app/objectPage/tables.json'
import { where } from '@/app/products/db'
import { ProductApi as ValidationSchema } from '@/app/products/product'
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
  let data = create(fields, ValidationSchema)
  if (image) {
    data.image = await upload(image)
  }
  return data
}

export default async function handle(
  req: NextApiRequest,
  { json }: NextApiResponse
) {
  const { method, query } = req
  switch (method) {
    case 'GET':
      const objects = await prisma.product.findMany({
        where: where(query),
        select: tables.products.select.objects,
      })
      return json(objects)
    case 'POST':
      const newObject = await prisma.product.create({
        data: await getObjectData(req)
      })
      return json(newObject)
    default:
      throw new Error(
        `The HTTP ${method} method is not supported at this route.`
      )
  }
}
