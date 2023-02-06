import 'server-only'

import prisma from '@/services/prisma'
import type { Prisma } from "@prisma/client"
import { createPaginator } from "prisma-pagination"
import { ParsedUrlQuery } from "querystring"
import { Customer } from './helpers'
import select from './select.json'

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
			select,
			orderBy: [
				{
					updated_at: 'desc',
				},
			],
		},
		{
			page: String(searchParams.page || '1')
		})
}
