import { Prisma } from "@prisma/client"
import tables from '@/app/objectPage/tables.json'

export type City = Prisma.CityGetPayload<{
	select: typeof tables.customers.select.objects.city.select
}>
