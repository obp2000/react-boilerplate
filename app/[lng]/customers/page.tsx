import { TablePage } from '../_components/TablePage'
import type { Translation } from '@/app/i18n/dictionaries'
import { getGetOptionLabel as getGetCityName } from '@/app/customer/cities/helpers'
import { getShortName } from '@/app/customer/serverHelpers'
import { findManyArgs } from '@/app/api/customers/route'
import type { SerializedCustomer } from '@/interfaces/customers'
import Date from '@/app/components/Date'
import { cache } from 'react'
import { type PaginateFunction, createPaginator } from 'prisma-pagination'
import type { Customer } from '@/interfaces/customers'
import { prisma } from '@/services/prisma'
import { Prisma } from '@prisma/client'

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
	const cityName = getGetCityName(customer.city?.pindex)
	const shortName = getShortName(customer)
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


// const getObjects = cache(async function ({
// 	perPage = Number(process.env.NEXT_PUBLIC_OBJECTS_PER_PAGE),
// 	searchParams: {
// 		page = '1',
// 		term,
// 	}
// }: {
// 	perPage: number
// 	searchParams: {
// 		page?: string
// 		term?: string
// 	}
// }) {
// 	const paginate = createPaginator({ perPage })
// 	return paginate<Customer, Prisma.CustomerFindManyArgs>(
// 		prisma.customer,
// 		findManyArgs(term),
// 		{ page })
// })
