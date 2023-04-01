import type { ProductType } from '@prisma/client'

export type ProductTypeType = Pick<ProductType, 'id' | 'name'>
