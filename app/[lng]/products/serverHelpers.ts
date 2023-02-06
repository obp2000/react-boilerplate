import 'server-only'

import prisma from '@/services/prisma'
import type { Prisma } from "@prisma/client"
import { createPaginator } from "prisma-pagination"
import { ParsedUrlQuery } from "querystring"
import { Product } from "./helpers"
import select from './select.json'

export function where({ term }: ParsedUrlQuery) {
	if (!term) { return {} }
	const containsTerm = { contains: String(term) }
	return {
		OR: [
			{ name: containsTerm },
			{ productType: { name: containsTerm } },
		]
	}
}

export async function getObjects({
	perPage = 8,
	searchParams
}: { perPage?: number } & { searchParams: ParsedUrlQuery }) {
	const paginate = createPaginator({ perPage })
	return paginate<Product, Prisma.ProductFindManyArgs>(
		prisma.product,
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
