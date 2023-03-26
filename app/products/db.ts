import prisma from '@/services/prisma'
import { createPaginator } from "prisma-pagination"
import { ParsedUrlQuery } from "querystring"
import tables from '@/app/objectPage/tables.json'
import { Product } from '@/interfaces/products'
import { Prisma } from ".prisma/client"

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
}: {
	perPage?: number
	searchParams: ParsedUrlQuery
}) {
	const paginate = createPaginator({ perPage })
	return paginate<Product, Prisma.ProductFindManyArgs>(
		prisma.product,
		{
			where: where(searchParams),
			select: tables.products.select.objects,
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
