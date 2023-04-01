import { Prisma } from "@prisma/client"
import tables from '@/app/objectPage/tables.json'

export type Values = Prisma.ProductUncheckedCreateWithoutOrderItemsInput |
	Prisma.ProductUncheckedUpdateWithoutOrderItemsInput

export type Product = Prisma.ProductGetPayload<{
	select: typeof tables.products.select.objects
}>

export type ProductObject = Prisma.ProductGetPayload<{
	select: typeof tables.products.select.object
}>
