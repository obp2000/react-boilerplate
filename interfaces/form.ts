import type { Translation } from "@/app/i18n/dictionaries"
import type { UseControllerProps, UseFormRegister, UseFormSetValue } from "react-hook-form"
import { City } from "./cities"
import { Customer } from "./customers"
import { Product } from "./products"

export type SelectProps = {
	name: string
	register: UseFormRegister<any>
	label: string
	choices: { id: number, name: string }[]
	disabled: boolean
	choiceLabels?: Record<string, string>
	defaultValue: number | null
}

export type AutocompleteProps = {
	table: string
	label?: string
	getOptionLabel: (arg0: any) => string
	busy: boolean
	errorMessages: Translation['errorMessages']
	notFound: string
	onChangeAction?: (arg0: any) => void
	className?: string
	register: UseFormRegister<any>
	setValue: UseFormSetValue<any>
} & UseControllerProps<any>

export type ServerActionResult =
	| {
		success: true
		message?: string
		objects?: any
	}
	| {
		success: false
		error: string
	}

export type AnyObject = City | Customer | Product
