import { notFound } from 'next/navigation'
import { cache } from 'react'

import tables from '@/app/_tables/tables.json'
import { getDictionary } from '@/app/i18n/dictionaries'
import { fallbackLng } from '@/app/i18n/settings'
import { prisma } from '@/services/prisma'
import { Prisma } from '@prisma/client'

import type { CustomerPageProps } from '@/interfaces/customers'
import type { OrderPageProps } from '@/interfaces/orders'
import type { ProductPageProps } from '@/interfaces/products'

export type ObjectTables = Omit<typeof tables, 'users'>

export function getModel(table: string) {
	return tables[table as keyof ObjectTables].singular
}

// export function getPrismaClient(table: string):
// 	Prisma.CityDelegate<Prisma.RejectOnNotFound>
export function getPrismaClient(table: string):
	Prisma.CustomerDelegate<Prisma.RejectOnNotFound>
export function getPrismaClient(table: string):
	Prisma.ProductDelegate<Prisma.RejectOnNotFound>
export function getPrismaClient(table: string):
	Prisma.OrderDelegate<Prisma.RejectOnNotFound>
export function getPrismaClient(table: string): any {
	const model = tables[table as keyof ObjectTables].singular
	return prisma[model as keyof typeof prisma]
}

export const findObject = cache(async function ({
	table,
	id
}: {
	table: string
	id: string
}) {
	try {
		const select = tables[table as keyof Omit<ObjectTables, 'cities'>].select.object
		const prismaClient = getPrismaClient(table)
		const { createdAt, ...object } = await prismaClient.findUniqueOrThrow({
			where: { id: Number(id) },
			select,
		})
		return { ...object, createdAt: createdAt.toISOString() }
	} catch (e) {
		notFound()
	}
})

export async function ObjectPage(props: CustomerPageProps): Promise<JSX.Element>
export async function ObjectPage(props: ProductPageProps): Promise<JSX.Element>
export async function ObjectPage(props: OrderPageProps): Promise<JSX.Element>
export async function ObjectPage({
	params: {
		lng = fallbackLng,
		id
	},
	table,
	labels,
	getOptions,
	form,
}: {
	params: {
		lng: string
		id: string
	}
	table: string
	labels: any
	getOptions?: () => Promise<any>
	form: (props: any) => JSX.Element
}): Promise<JSX.Element> {
	const [initialValues, dict, options] = await Promise.all([
		id === 'new'
			? tables[table as keyof Omit<ObjectTables, 'cities'>].initObject
			: findObject({ table, id }),
		getDictionary(lng),
		getOptions ? getOptions() : {},
	])
	const Form = form
	const {
		save,
		errorMessages,
		units,
	} = dict
	const mutateArgs = {
		lng,
		table,
		id: id === 'new' ? undefined : Number(id),
	}
	return <Form {...{
		mutateArgs,
		initialValues,
		labels: {
			save,
			errorMessages,
			units,
			...labels(dict)
		},
		...options,
	}} />
}
