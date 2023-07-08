import tables from '@/app/_tables/tables.json'
import type { Translation } from "@/app/i18n/dictionaries"
import { Prisma } from "@prisma/client"
import type {
    UseControllerProps,
    UseFormRegister,
    UseFormSetValue
} from "react-hook-form"
import type { SerializedOrderObject } from "./orders"

// export type Values = Prisma.CustomerUncheckedCreateWithoutOrdersInput |
// 	Prisma.CustomerUncheckedUpdateWithoutOrdersInput

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
	id?: number
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
	handleSubmit: (formData: FormData) => Promise<void>
}

export type CustomerRowType = (arg0: SerializedCustomer) => (string | JSX.Element)[]

export type CustomerLabels = (dict: Translation) => {
	notFound: Translation['not_found'],
	labels: Translation['customer']
}

export type CustomerAutocompleteProps = {
	searchPath: string
	label?: string
	init?: Customer | null
	getOptionLabel: (arg0: Customer) => string
	busy: boolean
	errorMessages: Translation['errorMessages']
	notFound: string
	onChangeAction?: (arg0: Customer) => void
	className?: string
	register: UseFormRegister<any>
	setValue: UseFormSetValue<any>
} & UseControllerProps<SerializedOrderObject, 'customer'>

export type CustomerPageProps = {
	params: { lng: string, id: string }
	table: string
	labels: CustomerLabels
	form: (props: CustomerFormProps) => JSX.Element
	handleSubmit: (formData: FormData) => Promise<void>
}
