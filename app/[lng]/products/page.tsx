import { cache } from 'react'
import { createPaginator } from 'prisma-pagination'

import { TablePage } from '../_components/TablePage'
import { findManyArgs, getGetProductFullName } from './_components/helpers'
import Date from '@/app/components/Date'
import { prisma } from '@/services/prisma'
import { Prisma } from "@prisma/client"

import type { PaginateFunction } from 'prisma-pagination'
import type { Translation } from '@/app/i18n/dictionaries'
import type { Product, SerializedProduct } from '@/interfaces/products'

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
	return paginate<Product, Prisma.ProductFindManyArgs>(
		prisma.product,
		findManyArgs(term),
		{ page })
})

function getTableRow({ product }: Translation) {
	const getProductFullName = getGetProductFullName(product)
	return function tableRow({
		id,
		price,
		width,
		density,
		createdAt,
		updatedAt,
		...rest
	}: SerializedProduct) {
		return [
			id,
			getProductFullName(rest),
			price,
			width,
			density,
			<Date key={id} dateString={createdAt} />,
			<Date key={id + 1} dateString={updatedAt} />,
		]
	}
}

export default async function Page(props: {
	params: { lng: string }
	searchParams: { page?: string, term?: string }
}) {
	const table = 'products'
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
// 	return paginate<Product, Prisma.ProductFindManyArgs>(
// 		prisma.product,
// 		findManyArgs(term),
// 		{ page })
// })
