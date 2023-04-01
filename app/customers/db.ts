import prisma from '@/services/prisma'
import { createPaginator } from "prisma-pagination"
import type { ParsedUrlQuery } from 'querystring'
import tables from '@/app/objectPage/tables.json'
import { Customer } from '@/interfaces/customers'
import { Prisma } from "@prisma/client"

export function where({ term }: ParsedUrlQuery) {
	if (!term) { return {} }
	const containsTerm = { contains: String(term) }
	return {
		OR: [
			{ nick: containsTerm },
			{ name: containsTerm },
			{ address: containsTerm },
			{ city: { city: containsTerm } }
		]
	}
}

export async function getObjects({
	perPage = 8,
	searchParams
}: { perPage?: number, searchParams: ParsedUrlQuery }) {
	const paginate = createPaginator({ perPage })
	return paginate<Customer, Prisma.CustomerFindManyArgs>(
		prisma.customer,
		{
			where: where(searchParams),
			select: tables.customers.select.objects,
			orderBy: [
				{
					updatedAt: 'desc',
				},
			],
		},
		{
			page: String(searchParams.page || '1')
		})
}
