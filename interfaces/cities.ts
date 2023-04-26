import { Prisma } from "@prisma/client"
import tables from '@/app/_tables/tables.json'

export type City = Prisma.CityGetPayload<{
	select: typeof tables.customers.select.objects.city.select
}>
