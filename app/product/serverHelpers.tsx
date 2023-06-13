import 'server-only'

import type { Translation } from "@/app/i18n/dictionaries"
import type { Product, SerializedProduct } from '@/interfaces/products'
import Date from '@/app/components/Date'
import { getGetOptionLabel as getGetProductName } from '@/app/product/helpers'
import { prisma } from '@/services/prisma'
import { createPaginator } from 'prisma-pagination'
import tables from '@/app/_tables/tables.json'
import { Prisma } from "@prisma/client"

export function getTableRow(dict: Translation) {
	const productName = getGetProductName(dict.product)
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
			productName(rest),
			price,
			width,
			density,
			<Date key={id} dateString={createdAt} />,
			<Date key={id+1} dateString={updatedAt} />,
		]
	}
}

export function tableLabels({ product }: Translation) {
	return [
		product.id,
		product.name,
		product.price,
		product.width,
		product.density,
		product.createdAt,
		product.updatedAt,
	]
}

export function where({ term }: { term?: string }) {
	if (!term) { return {} }
	const containsTerm = { contains: term }
	return {
		OR: [
			{ name: containsTerm },
			{ productType: { name: containsTerm } },
		]
	}
}

export function findManyArgs(
	searchParams: { page?: string, term?: string }
): Prisma.ProductFindManyArgs {
	return {
		where: where(searchParams),
		select: tables.products.select.objects,
		orderBy: [
			{
				updatedAt: 'desc',
			},
		],
	}
}

export async function getObjects({
	perPage = Number(process.env.NEXT_PUBLIC_OBJECTS_PER_PAGE),
	searchParams
}: {
	perPage: number
	searchParams: { page?: string, term?: string }
}) {
	const paginate = createPaginator({ perPage })
	return paginate<Product, Prisma.ProductFindManyArgs>(
		prisma.product,
		findManyArgs(searchParams),
		{
			page: searchParams.page || '1'
		})
}

export function labels({ product: labels }: Translation) {
	return {
		labels,
	}
}

export async function getOptions() {
	const productTypes = await prisma.productType.findMany({
		select: tables.products.select.objects.productType.select
	})
	return { productTypes }
}
