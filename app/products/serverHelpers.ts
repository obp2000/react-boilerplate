import 'server-only'

import type { Translation } from '@/app/i18n/dictionaries'
import { getProductTypes } from '@/app/products/productTypes/serverHelpers'
import prisma from '@/services/prisma'
import type { Prisma } from "@prisma/client"
import { createPaginator } from "prisma-pagination"
import { ParsedUrlQuery } from "querystring"
import select from './select.json'
import {
	densityForCount,
	metersInRoll,
	prices,
	type Product,
	type Values
} from './calculator'
import product from './product.json'

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
	return paginate<Prisma.ProductGetPayload<{ select: typeof select.objects }>,
		Prisma.ProductFindManyArgs>(
			prisma.product,
			{
				where: where(searchParams),
				select: select.objects,
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

export async function getObject(id: number) {
	return await prisma.product.findUniqueOrThrow({
		where: {
			id,
		},
		select: select.object,
	})
}

// export function getInitialValues({ object }: { object?: Product }): Values {
// 	let { created_at, ...rest } = object ?? {}
// 	let objectValues = rest as Values
// 	return {
// 		...objectValues,
// 		density_for_count: densityForCount(null, objectValues),
// 		meters_in_roll: metersInRoll(null, objectValues),
// 		prices: prices(null, objectValues),
// 	}
// }

export function getInitialValues({ object = product }: { object?: Product }): Values {
	let { created_at, ...rest } = object
	let objectValues = rest as Values
	return objectValues
}

export function labels({ product: labels }: Translation) {
	return {
		labels,
	}
}

export async function getOptions() {
	const productTypes = await getProductTypes()
	return { productTypes }
}
