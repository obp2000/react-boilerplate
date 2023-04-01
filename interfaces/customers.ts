import { Prisma } from "@prisma/client"
import tables from '@/app/objectPage/tables.json'

export type Values = Prisma.CustomerUncheckedCreateWithoutOrdersInput |
	Prisma.CustomerUncheckedUpdateWithoutOrdersInput

export type Customer = Prisma.CustomerGetPayload<{
	select: typeof tables.customers.select.objects
}>

export type CustomerObject = Prisma.CustomerGetPayload<{
	select: typeof tables.customers.select.object
}>
