import {
	getRenderInput,
	getRenderOption,
	isOptionEqualToValue,
	onSearch
} from '@/app/_objects/formHelpers'
import { Autocomplete } from '@mui/material'
import { useState } from 'react'
import type {
	ControllerRenderProps,
	ControllerFieldState,
	UseFormStateReturn
} from "react-hook-form"
import type { Translation } from '@/app/i18n/dictionaries'
import type { SerializedOrderObject } from '@/interfaces/orders'
import { Customer } from '@/interfaces/customers'

type Props = {
	label: string
	getOptionLabel: (customer: Customer) => string
	busy: boolean
	errorMessages: Translation['errorMessages']
	notFound: string,
}

export default function renderCustomer({
	label,
	getOptionLabel,
	busy,
	errorMessages,
	notFound,
}: Props) {
	return ({
		field: { onChange, ...field },
		fieldState: { error },
		formState: { defaultValues },
	}: {
		field: ControllerRenderProps<SerializedOrderObject, 'customer'>
		fieldState: ControllerFieldState
		formState: UseFormStateReturn<SerializedOrderObject>
	}) => {
		const { customer: init } = defaultValues as SerializedOrderObject
		const [options, setOptions] = useState(init ? [init] : [])
		const [loading, setLoading] = useState(false)
		return <Autocomplete
			{...field}
			// id='customer'
			onChange={(_, newValue) => onChange(newValue)}
			autoComplete
			includeInputInList
			// filterSelectedOptions
			size='small'
			isOptionEqualToValue={isOptionEqualToValue}
			getOptionLabel={getOptionLabel}
			renderOption={getRenderOption(getOptionLabel)}
			options={options}
			// filterOptions={(x) => x}
			onInputChange={onSearch('/customers/', setOptions, setLoading, field.value)}
			noOptionsText={notFound}
			className='col-span-3'
			renderInput={getRenderInput({
				label,
				error,
				busy,
				loading,
				errorMessages,
				field,
			})}
		/>
	}
}


// export function CustomerField({
// 	labels,
// 	customerLabels,
// 	busy,
// 	errors: {
// 		customer: error
// 	},
// 	errorMessages,
// 	notFound,
// 	control,
// 	initialValues: {
// 		customer
// 	}
// }: CustomerFieldProps) {
// 	const [currentValue, setCurrentValue] = useState(customer)
// 	const [options, setOptions] = useState(customer ? [customer] : [])
// 	const [loading, setLoading] = useState(false)
// 	const getOptionLabel = getGetOptionLabel(customerLabels)
// 	return <Controller
// 		name="customer"
// 		control={control}
// 		render={({ field: { ref, onChange, ...field } }) => <Autocomplete
// 			{...field}
// 			id='customer'
// 			onChange={(_, newValue) => {
// 				if (newValue) {
// 					setCurrentValue(newValue)
// 				}
// 				return onChange(newValue)
// 			}}
// 			autoComplete
// 			includeInputInList
// 			filterSelectedOptions
// 			size='small'
// 			isOptionEqualToValue={isOptionEqualToValue}
// 			getOptionLabel={getOptionLabel}
// 			renderOption={getRenderOption(getOptionLabel)}
// 			options={options}
// 			// filterOptions={(x) => x}
// 			onInputChange={onSearch('/customers/', setOptions, setLoading, currentValue)}
// 			noOptionsText={notFound}
// 			className='col-span-3'
// 			renderInput={getRenderInput({
// 				label: labels.customer,
// 				error: error as FieldError,
// 				busy,
// 				loading,
// 				errorMessages,
// 				field,
// 				ref
// 			})}
// 		/>}
// 	/>
// }
