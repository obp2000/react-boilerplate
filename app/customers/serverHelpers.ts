import 'server-only'

import type { Translation } from '@/app/i18n/dictionaries'
import prisma from '@/services/prisma'
import type { Prisma } from "@prisma/client"
import { createPaginator } from "prisma-pagination"
import { ParsedUrlQuery } from "querystring"
import type { Customer, Values } from './calculator'
import select from './select.json'
import customer from './customer.json'

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
	return paginate<Prisma.CustomerGetPayload<{ select: typeof select.objects }>,
		Prisma.CustomerFindManyArgs>(
			prisma.customer,
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
	return await prisma.customer.findUniqueOrThrow({
		where: {
			id,
		},
		select: select.object,
	})
}

export function getInitialValues({ object = customer }: { object?: Customer }): Values {
	const { created_at, ...rest } = object
	let objectValues = rest as Values
	return objectValues
}

export function labels({ not_found: notFound, customer: labels }: Translation) {
	return {
		notFound,
		labels,
	}
}

export async function getOptions() {
	return {}
}
