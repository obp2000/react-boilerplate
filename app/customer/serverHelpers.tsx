import 'server-only'

import type { Translation } from "@/app/i18n/dictionaries"
import type { Customer, SerializedCustomer } from '@/interfaces/customers'
import Date from '@/app/components/Date'
import { getGetOptionLabel as getGetCityName } from './cities/helpers'
import { prisma } from '@/services/prisma'
import { createPaginator } from 'prisma-pagination'
import tables from '@/app/_tables/tables.json'
import { Prisma } from "@prisma/client"
import { cache } from 'react'

function getShortName(labels: Translation['customer']) {
	return (customer: Partial<Customer>) => {
		if (!customer) { return '' }
		const label = []
		label.push(customer.nick)
		if (customer.name) {
			label.push(`${labels.name}: ${customer.name}`)
		}
		return label.join(' ')
	}
}

function getTableRow(dict: Translation) {
	const cityName = getGetCityName(dict.customer.city)
	const shortName = getShortName(dict.customer)
	return function tableRow({
		id,
		city,
		address,
		createdAt,
		updatedAt,
		...rest
	}: SerializedCustomer) {
		return [
			id,
			shortName(rest),
			city ? cityName(city) : '',
			address,
			<Date key={id} dateString={createdAt} />,
			<Date key={id + 1} dateString={updatedAt} />,
		]
	}
}

function tableLabels({ customer }: Translation) {
	return [
		customer.id,
		customer.name,
		customer.city.city,
		customer.address,
		customer.createdAt,
		customer.updatedAt,
	]
}

function where({ term }: { term?: string }) {
	if (!term) { return {} }
	const containsTerm = { contains: term }
	return {
		OR: [
			{ nick: containsTerm },
			{ name: containsTerm },
			{ address: containsTerm },
			{ city: { city: containsTerm } }
		]
	}
}

function findManyArgs(
	searchParams: { page?: string, term?: string }
): Prisma.CustomerFindManyArgs {
	return {
		where: where(searchParams),
		select: tables.customers.select.objects,
		orderBy: [
			{
				updatedAt: 'desc',
			},
		],
	}
}

const getObjects = cache(async function({
	perPage = Number(process.env.NEXT_PUBLIC_OBJECTS_PER_PAGE),
	searchParams
}: {
	perPage: number
	searchParams: { page?: string, term?: string }
}) {
	const paginate = createPaginator({ perPage })
	return paginate<Customer, Prisma.CustomerFindManyArgs>(
		prisma.customer,
		findManyArgs(searchParams),
		{
			page: searchParams.page || '1'
		})
})

function labels({ not_found: notFound, customer: labels }: Translation) {
	return {
		notFound,
		labels,
	}
}

async function getOptions() {
	return {}
}

export {
	getShortName,
	getTableRow,
	tableLabels,
	where,
	findManyArgs,
	getObjects,
	labels,
	getOptions
}
