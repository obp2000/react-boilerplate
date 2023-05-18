import { Prisma } from "@prisma/client"
import tables from '@/app/_tables/tables.json'
import type { ProductTypeType } from "./productTypes"
import type { Translation } from "@/app/i18n/dictionaries"

export type Values = Prisma.ProductUncheckedCreateWithoutOrderItemsInput |
	Prisma.ProductUncheckedUpdateWithoutOrderItemsInput

export type Product = Prisma.ProductGetPayload<{
	select: typeof tables.products.select.objects
}>

export type ProductObject = Prisma.ProductGetPayload<{
	select: typeof tables.products.select.object
}>

export type SerializedProduct = Omit<Product, 'createdAt' | 'updatedAt'> &
{
	createdAt: string
	updatedAt: string
}

export type SerializedProductObject = Omit<ProductObject, 'createdAt'> &
{
	createdAt?: string
}

export type ProductFormProps = {
  lng: string
  table: string
  id?: number
  initialValues: SerializedProductObject
  productTypes: ProductTypeType[]
  save: string
  errorMessages: Translation['errorMessages']
  units: Translation['units']
  labels: Translation['product']
}

export type ProductRowType = (arg0: Product) => (string | JSX.Element)[]

export type ProductLabels = (dict: Translation) => { labels: Translation['product'] }
