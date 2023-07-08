import type { Translation } from "@/app/i18n/dictionaries"
import type { UseControllerProps, UseFormRegister, UseFormSetValue } from "react-hook-form"

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
	searchPath: string
	label?: string
	init?: any
	getOptionLabel: (arg0: any) => string
	busy: boolean
	errorMessages: Translation['errorMessages']
	notFound: string
	onChangeAction?: (arg0: any) => void
	className?: string
	register: UseFormRegister<any>
	setValue: UseFormSetValue<any>
} & UseControllerProps<any>
