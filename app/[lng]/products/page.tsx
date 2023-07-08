import { TablePage } from '../_components/TablePage'
import type { Translation } from '@/app/i18n/dictionaries'
import { getGetProductFullName } from '@/app/product/helpers'
import type { Product, SerializedProduct } from '@/interfaces/products'
import Date from '@/app/components/Date'
import { prisma } from '@/services/prisma'
import { type PaginateFunction, createPaginator } from 'prisma-pagination'
import { Prisma } from "@prisma/client"
import { findManyArgs } from '@/app/api/products/route'
import { cache } from 'react'

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
