import { Prisma } from "@prisma/client"
import tables from '@/app/_tables/tables.json'
import type { Translation } from "@/app/i18n/dictionaries"

export type Values = Prisma.CustomerUncheckedCreateWithoutOrdersInput |
	Prisma.CustomerUncheckedUpdateWithoutOrdersInput

export type Customer = Prisma.CustomerGetPayload<{
	select: typeof tables.customers.select.objects
}>

export type CustomerObject = Prisma.CustomerGetPayload<{
	select: typeof tables.customers.select.object
}>

export type SerializedCustomer = Omit<Customer, 'createdAt' | 'updatedAt'> &
{
	createdAt: string
	updatedAt: string
}

export type SerializedCustomerObject = Omit<CustomerObject, 'createdAt'> &
{
	createdAt?: string
}

export type CustomerFormProps = {
	mutateArgs: {
		lng: string
		table: string
		id?: number
		message: string
	}
	initialValues: SerializedCustomerObject
	save: string
	notFound: string
	errorMessages: Translation['errorMessages']
	labels: Translation['customer']
}

export type CustomerRowType = (arg0: SerializedCustomer) => (string | JSX.Element)[]

export type CustomerLabels = (dict: Translation) => {
	notFound: Translation['not_found'],
	labels: Translation['customer']
}
