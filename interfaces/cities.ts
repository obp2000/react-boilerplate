import { Prisma } from "@prisma/client"
import tables from '@/app/_tables/tables.json'
import type { Translation } from "@/app/i18n/dictionaries"
import type { SerializedCustomerObject } from "./customers"
import type {
	UseControllerProps,
	UseFormRegister,
	UseFormSetValue
} from "react-hook-form"

export type City = Prisma.CityGetPayload<{
	select: typeof tables.customers.select.objects.city.select
}>

export type CityAutocompleteProps = {
	table: string
	label?: string
	init?: City | null
	getOptionLabel: (arg0: City) => string
	busy: boolean
	errorMessages: Translation['errorMessages']
	notFound: string
	onChangeAction?: (arg0: City) => void
	className?: string
	register: UseFormRegister<any>
	setValue: UseFormSetValue<any>
} & UseControllerProps<SerializedCustomerObject, 'city'>
