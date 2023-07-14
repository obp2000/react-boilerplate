import { createPaginator } from 'prisma-pagination'
import { cache } from 'react'

import Date from '@/app/components/Date'
import { prisma } from '@/services/prisma'
import { Prisma } from '@prisma/client'
import { TablePage } from '../_components/TablePage'
import { getGetCityName } from './_components/cities/helpers'
import {
    findManyArgs,
    getGetCustomerShortName
} from './_components/helpers'

import type { Translation } from '@/app/i18n/dictionaries'
import type {
	Customer,
	SerializedCustomer
} from '@/interfaces/customers'
import type { PaginateFunction } from 'prisma-pagination'

const getObjects = cache(async function ({
	paginate,
	searchParams: {
		page = '1',
		term,
	}
}: {
	paginate: PaginateFunction
	searchParams: {
		page?: string
		term?: string
	}
}) {
	return paginate<Customer, Prisma.CustomerFindManyArgs>(
		prisma.customer,
		findManyArgs(term),
		{ page })
})

function getTableRow({ customer }: Translation) {
	const getCityName = getGetCityName(customer.city?.pindex)
	const getCustomerShortName = getGetCustomerShortName(customer)
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
			getCustomerShortName(rest),
			city ? getCityName(city) : '',
			address,
			<Date key={id} dateString={createdAt} />,
			<Date key={id + 1} dateString={updatedAt} />,
		]
	}
}

export default async function Page(props: {
	params: { lng: string }
	searchParams: { page?: string, term?: string }
}) {
	const table = 'customers'
	return <TablePage {...{
		...props,
		table,
		getObjects,
		createPaginator,
		getTableRow,
	}} />
}
