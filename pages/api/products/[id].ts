import { getData } from '@/services/formidable'
import prisma from '@/services/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'
import { assert } from 'superstruct'
import { Product } from './product'
import { uploadImage } from '@/services/cloudinary'
import type { File } from "formidable"

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse) {
  switch (req.method) {
    case 'PUT':
      const { fields, files } = await getData(req)
      // const { fields, files } = await parseForm(req)
      // console.log('files image props ', files.image)
      // console.log('fields', fields)
      // console.log('files', files)
      let {
        name,
        threads,
        contents,
        price,
        weight,
        width,
        density,
        dollar_price,
        dollar_rate,
        width_shop,
        density_shop,
        weight_for_count,
        length_for_count,
        price_pre,
        image,
        product_type_id,
        fleece,
      } = fields
      if (files.image) {
        const { version, public_id, format } =
          await uploadImage((files.image as File).filepath as string) as
          { version: number, public_id: string, format: string }
        image = `${version}/${public_id}.${format}`
      }
      const data = {
        name,
        threads: threads ? parseInt(String(threads)) : undefined,
        contents: contents ? parseInt(String(contents)) : undefined,
        price: parseInt(String(price)),
        weight: weight ? Number(weight) : undefined,
        width: width ? Number(width) : undefined,
        density: density ? parseInt(String(density)) : undefined,
        dollar_price: dollar_price ? Number(dollar_price) : undefined,
        dollar_rate: dollar_rate ? Number(dollar_rate) : undefined,
        width_shop: width_shop ? parseInt(String(width_shop)) : undefined,
        density_shop: density_shop ? parseInt(String(density_shop)) : undefined,
        weight_for_count: weight_for_count ? parseInt(String(weight_for_count)) : undefined,
        length_for_count: length_for_count ? Number(length_for_count) : undefined,
        price_pre: price_pre ? parseInt(String(price_pre)) : undefined,
        image,
        product_type_id,
        fleece: fleece === 'true',
      }
      assert(data, Product)
      const object = await prisma.product.update({
        where: { id: Number(req.query.id) },
        data: {
          ...data,
          productType: data.product_type_id
            ? { connect: { id: parseInt(String(data.product_type_id)) } }
            : { disconnect: true },
          product_type_id: undefined,
          updated_at: new Date(),
        },
      })
      res.json(object)
      // console.log('updatedObject ', updatedObject)
      break
    case 'DELETE':
      const deletedObject = await prisma.product.delete({
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
