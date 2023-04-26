import { getDictionary } from '@/app/i18n/dictionaries'
import ClientOnly from './ClientOnly'
import type { CustomerFormProps, CustomerLabels } from '@/interfaces/customers'
import type { ProductFormProps, ProductLabels } from '@/interfaces/products'
import type { OrderFormProps, OrderLabels } from '@/interfaces/orders'
import { ProductTypeType } from '@/interfaces/productTypes'
import tables from '@/app/_tables/tables.json'
import type { SerializedCustomerObject } from '@/interfaces/customers'
import type { SerializedOrderObject } from '@/interfaces/orders'
import type { SerializedProductObject } from '@/interfaces/products'
import prisma from '@/services/prisma'
import { Prisma } from '@prisma/client'
import { notFound } from 'next/navigation'
import type { ParsedUrlQuery } from 'querystring'
import { fallbackLng } from '@/app/i18n/settings'

export function getPrismaClient(model: string): Prisma.CustomerDelegate<Prisma.RejectOnNotFound>
export function getPrismaClient(model: string): Prisma.ProductDelegate<Prisma.RejectOnNotFound>
export function getPrismaClient(model: string): Prisma.OrderDelegate<Prisma.RejectOnNotFound>
export function getPrismaClient(model: string): any {
	return prisma[model as keyof typeof prisma]
}

export async function findObject({ table, id }: { table: string, id: string }) {
	try {
		const model = tables[table as keyof typeof tables].singular
		const select = tables[table as keyof typeof tables].select.object
		const prismaClient = getPrismaClient(model)
		const { createdAt, ...object } = await prismaClient.findUniqueOrThrow({
			where: { id: Number(id) },
			select,
		})
		return { ...object, createdAt: createdAt.toISOString() }
	} catch (e) {
		notFound()
	}
}

export async function getInitialValues(props: { id: string, table: string }): Promise<SerializedCustomerObject>
export async function getInitialValues(props: { id: string, table: string }): Promise<SerializedProductObject>
export async function getInitialValues(props: { id: string, table: string }): Promise<SerializedOrderObject>
export async function getInitialValues({ id, table }: { id: string, table: string }): Promise<any> {
	return id === 'new'
		? tables[table as keyof typeof tables].initObject
		: await findObject({ table, id })
}

export async function ObjectPage(props: {
	params: ParsedUrlQuery
	table: string
	labels: CustomerLabels
	getOptions: () => Promise<{}>
	form: (props: CustomerFormProps) => JSX.Element
}): Promise<JSX.Element>
export async function ObjectPage(props: {
	params: ParsedUrlQuery
	table: string
	labels: ProductLabels
	getOptions: () => Promise<ProductTypeType[]>
	form: (props: ProductFormProps) => JSX.Element
}): Promise<JSX.Element>
export async function ObjectPage(props: {
	params: ParsedUrlQuery
	table: string
	labels: OrderLabels
	getOptions: () => Promise<{}>
	form: (props: OrderFormProps) => JSX.Element
}): Promise<JSX.Element>
export async function ObjectPage({
	params,
	table,
	labels,
	getOptions,
	form,
}: {
	params: ParsedUrlQuery
	table: string
	labels: any
	getOptions: () => Promise<any>
	form: (props: any) => JSX.Element
}): Promise<JSX.Element> {
	const lng = String(params.lng || fallbackLng)
	const id = String(params.id)
	const [initialValues, dict, options] = await Promise.all([
		getInitialValues({ id, table }),
		getDictionary(lng),
		getOptions(),
	])
	const Form = form
	return <ClientOnly>
		<Form {...{
			id: id === 'new' ? undefined : Number(id),
			initialValues,
			save: dict.save,
			errorMessages: dict.errorMessages,
			units: dict.units,
			...labels(dict),
			...options,
		}} />
	</ClientOnly>
}
