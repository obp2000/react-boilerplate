import { getDictionary } from '@/app/i18n/dictionaries'
import { fallbackLng } from '@/app/i18n/settings'
import tables from '@/app/_tables/tables.json'
import type { CustomerFormProps, CustomerLabels } from '@/interfaces/customers'
import type { OrderFormProps, OrderLabels } from '@/interfaces/orders'
import type { ProductFormProps, ProductLabels } from '@/interfaces/products'
import { prisma } from '@/services/prisma'
import { Prisma } from '@prisma/client'
import { notFound } from 'next/navigation'
import { cache } from 'react'

export function getPrismaClient(model: string): Prisma.CustomerDelegate<Prisma.RejectOnNotFound>
export function getPrismaClient(model: string): Prisma.ProductDelegate<Prisma.RejectOnNotFound>
export function getPrismaClient(model: string): Prisma.OrderDelegate<Prisma.RejectOnNotFound>
export function getPrismaClient(model: string): any {
	return prisma[model as keyof typeof prisma]
}

type ObjectTables = Omit<typeof tables, 'users'>

export const findObject = cache(async function ({
	table,
	id
}: {
	table: string
	id: string
}) {
	try {
		const model = tables[table as keyof ObjectTables].singular
		const select = tables[table as keyof ObjectTables].select.object
		const prismaClient = getPrismaClient(model)
		const { createdAt, ...object } = await prismaClient.findUniqueOrThrow({
			where: { id: Number(id) },
			select,
		})
		return { ...object, createdAt: createdAt.toISOString() }
	} catch (e) {
		notFound()
	}
})

export async function ObjectPage(props: {
	params: { lng: string, id: string }
	table: string
	labels: CustomerLabels
	form: (props: CustomerFormProps) => JSX.Element
}): Promise<JSX.Element>
export async function ObjectPage(props: {
	params: { lng: string, id: string }
	table: string
	labels: ProductLabels
	getOptions: () => Promise<Pick<ProductFormProps, 'productTypes'>>
	form: (props: ProductFormProps) => JSX.Element
}): Promise<JSX.Element>
export async function ObjectPage(props: {
	params: { lng: string, id: string }
	table: string
	labels: OrderLabels
	form: (props: OrderFormProps) => JSX.Element
}): Promise<JSX.Element>
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
	params: { lng: string, id: string }
	table: string
	labels: any
	getOptions?: () => Promise<any>
	form: (props: any) => JSX.Element
}): Promise<JSX.Element> {
	const [initialValues, dict, options] = await Promise.all([
		id === 'new'
			? tables[table as keyof typeof tables].initObject
			: findObject({ table, id }),
		getDictionary(lng),
		getOptions ? getOptions() : {},
	])
	const Form = form
	const {
		successfully,
		[table as 'customers' | 'products' | 'orders']: {
			singular
		},
		created,
		updated,
		save,
		errorMessages,
		units,
	} = dict
	const message = `${singular} ${successfully.toLowerCase()} ${id === 'new' ? created : updated}`
	const mutateArgs = {
		lng,
		table,
		id: id === 'new' ? undefined : Number(id),
		message,
	}
	return <Form {...{
		mutateArgs,
		initialValues,
		save,
		errorMessages,
		units,
		...labels(dict),
		...options,
	}} />
}

// export async function NewObjectPage(props: {
// 	params: { lng: string }
// 	table: string
// 	labels: CustomerLabels
// 	form: (props: CustomerFormProps) => JSX.Element
// }): Promise<JSX.Element>
// export async function NewObjectPage(props: {
// 	params: { lng: string }
// 	table: string
// 	labels: ProductLabels
// 	getOptions: () => Promise<Pick<ProductFormProps, 'productTypes'>>
// 	form: (props: ProductFormProps) => JSX.Element
// }): Promise<JSX.Element>
// export async function NewObjectPage(props: {
// 	params: { lng: string }
// 	table: string
// 	labels: OrderLabels
// 	form: (props: OrderFormProps) => JSX.Element
// }): Promise<JSX.Element>
// export async function NewObjectPage({
// 	params: {
// 		lng = fallbackLng
// 	},
// 	table,
// 	labels,
// 	getOptions,
// 	form,
// }: {
// 	params: { lng: string }
// 	table: string
// 	labels: any
// 	getOptions?: () => Promise<any>
// 	form: (props: any) => JSX.Element
// }): Promise<JSX.Element> {
// 	const initialValues = tables[table as keyof typeof tables].initObject
// 	const [dict, options] = await Promise.all([
// 		getDictionary(lng),
// 		getOptions ? getOptions() : {},
// 	])
// 	const Form = form
// 	const {
// 		successfully,
// 		[table as 'customers' | 'products' | 'orders']: {
// 			singular
// 		},
// 		created
// 	} = dict
// 	const message = `${singular} ${successfully.toLowerCase()} ${created}`
// 	return <Form {...{
// 		lng,
// 		table,
// 		initialValues,
// 		save: dict.save,
// 		message,
// 		errorMessages: dict.errorMessages,
// 		units: dict.units,
// 		...labels(dict),
// 		...options,
// 	}} />
// }


// export async function getInitialValues(props: { id: string, table: string }): Promise<SerializedCustomerObject>
// export async function getInitialValues(props: { id: string, table: string }): Promise<SerializedProductObject>
// export async function getInitialValues(props: { id: string, table: string }): Promise<SerializedOrderObject>
// export async function getInitialValues({ id, table }: { id: string, table: string }): Promise<any> {
// 	return id === 'new'
// 		? tables[table as keyof typeof tables].initObject
// 		: await findObject({ table, id })
// }
