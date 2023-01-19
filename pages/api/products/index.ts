import { where } from '@/app/[lng]/products/helpers'
import select from '@/app/[lng]/products/select.json'
import prisma from '@/services/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'
import { assert } from 'superstruct'
import { Product } from './product'

export default async function handle({
  method,
  query,
  body
}: NextApiRequest, res: NextApiResponse) {
  switch (method) {
    case 'GET':
      const objects = await prisma.product.findMany({
        where: where(query),
        select,
      })
      res.json(objects)
      break
    case 'POST':
      const {
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
        productType,
        fleece,
        // density_for_count,
        // meters_in_roll,
        // prices,
      } = body
      const modBody = {
        name,
        threads: threads ? parseInt(threads) : undefined,
        contents: contents ? parseInt(contents) : undefined,
        price: parseInt(price),
        weight: weight ? Number(weight) : undefined,
        width: width ? Number(width) : undefined,
        density: density ? parseInt(density) : undefined,
        dollar_price: dollar_price ? Number(dollar_price) : undefined,
        dollar_rate: dollar_rate ? Number(dollar_rate) : undefined,
        width_shop: width_shop ? parseInt(width_shop) : undefined,
        density_shop: density_shop ? parseInt(density_shop) : undefined,
        weight_for_count: weight_for_count ? parseInt(weight_for_count) : undefined,
        length_for_count: length_for_count ? Number(length_for_count) : undefined,
        price_pre: price_pre ? parseInt(price_pre) : undefined,
        image: image ? image : '',
        productType,
        fleece: fleece ? Boolean(fleece) : undefined,
      }
      assert(modBody, Product)
      const newObject = await prisma.product.create({
        data: {
          ...modBody,
          created_at: new Date(),
          updated_at: new Date(),
          productType: productType?.id ? { connect: { id: productType.id } } : productType,
        },
      })
      res.json(newObject)
      break
    default:
      throw new Error(
        `The HTTP ${method} method is not supported at this route.`
      )
  }
}
