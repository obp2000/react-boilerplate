import { Prisma } from "@prisma/client"
import tables from '@/app/_tables/tables.json'
import type { Translation } from "@/app/i18n/dictionaries"
import type { Control, FieldErrors } from "react-hook-form"

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
  id?: number
  initialValues: SerializedCustomerObject
  save: string
  notFound: string
  errorMessages: Translation['errorMessages']
  labels: Translation['customer']
}

export type CityFieldProps = {
	labels: Translation['customer']['city']
	busy: boolean
	errors: FieldErrors<SerializedCustomerObject>
	errorMessages: Translation['errorMessages']
	notFound: string
	control: Control<SerializedCustomerObject>
	initialValues: SerializedCustomerObject
}

export type CustomerRowType = (arg0: SerializedCustomer) => (string | JSX.Element)[]

export type CustomerLabels = (dict: Translation) => {
	notFound: Translation['not_found'],
	labels: Translation['customer']
}
