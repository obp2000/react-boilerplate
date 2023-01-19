import prisma from '@/services/prisma'
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'
import select from './select.json'

export async function getObject({ id }: Params) {
  if (id === 'new') { return undefined }
  return prisma.product.findUnique({
    where: {
      id: Number(id),
    },
    select,
  })
}

export async function getProductTypes() {
  return prisma.productType.findMany({
    select: {
      id: true,
      name: true
    }
  })
}
