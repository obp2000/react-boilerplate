import { Autocomplete } from '@mui/material'
import { useState } from 'react'
import {
	getRenderInput,
	getRenderOption,
	isOptionEqualToValue,
	onSearch
} from '@/app/_objects/formHelpers'
import type { Translation } from '@/app/i18n/dictionaries'
import type { SerializedOrderObject } from '@/interfaces/orders'
import type { Product } from '@/interfaces/products'
import type {
	ControllerFieldState,
	ControllerRenderProps,
	UseFormSetValue,
	UseFormStateReturn
} from "react-hook-form"

type Props = {
	index: number
	getOptionLabel: (product: Product) => string
	busy: boolean
	errorMessages: Translation['errorMessages']
	setValue: UseFormSetValue<SerializedOrderObject>
	notFound: string
}

export default function renderProduct({
	index,
	getOptionLabel,
	busy,
	errorMessages,
	setValue: setFormValue,
	notFound,
}: Props) {
	return ({
		field: { onChange, ...field },
		fieldState: { error },
		formState: { defaultValues },
	}: {
		field: ControllerRenderProps<SerializedOrderObject, `orderItems.${number}.product`>
		fieldState: ControllerFieldState
		formState: UseFormStateReturn<SerializedOrderObject>
	}) => {
		const init = (defaultValues as SerializedOrderObject).orderItems?.[index]?.product
		const [options, setOptions] = useState(init ? [init] : [])
		const [loading, setLoading] = useState(false)
		return <Autocomplete
			{...field}
			onChange={(_, newValue) => {
				setFormValue(`orderItems.${index}.price`, newValue?.price || 0)
				return onChange(newValue)
			}}
			autoComplete
			includeInputInList
			filterSelectedOptions
			size='small'
			isOptionEqualToValue={isOptionEqualToValue}
			getOptionLabel={getOptionLabel}
			renderOption={getRenderOption(getOptionLabel)}
			options={options}
			// filterOptions={(x) => x}
			onInputChange={onSearch('/products/', setOptions, setLoading, field.value)}
			noOptionsText={notFound}
			renderInput={getRenderInput({
				label: '',
				error,
				busy,
				loading,
				errorMessages,
				field,
			})}
		/>
	}
}


// export function ProductField({
// 	index,
// 	initialValues: {
// 		product
// 	},
// 	getProductOptionLabel,
// 	busy,
// 	errors,
// 	errorMessages,
// 	setValue,
// 	notFound,
// 	control,
// }: ProductFieldProps) {
// 	const [currentValue, setCurrentValue] = useState(product)
// 	const [options, setOptions] = useState(product ? [product] : [])
// 	const [loading, setLoading] = useState(false)
// 	return <Controller name={`orderItems.${index}.product`}
// 		control={control}
// 		render={({ field: { onChange, ...field } }) => <Autocomplete
// 			{...field}
// 			id={`orderItems.${index}.product`}
// 			onChange={(_, newValue) => {
// 				if (newValue) {
// 					setValue(`orderItems.${index}.price`, newValue.price as ProductObject)
// 				}
// 				setCurrentValue(newValue)
// 				onChange(newValue)
// 			}}
// 			autoComplete
// 			includeInputInList
// 			filterSelectedOptions
// 			size='small'
// 			isOptionEqualToValue={isOptionEqualToValue}
// 			getOptionLabel={getProductOptionLabel}
// 			renderOption={getRenderOption(getProductOptionLabel)}
// 			options={options}
// 			// filterOptions={(x) => x}
// 			onInputChange={onSearch('/products/', setOptions, setLoading, currentValue)}
// 			noOptionsText={notFound}
// 			renderInput={getRenderInput({
// 				label: '',
// 				error: errors?.product as FieldError,
// 				busy,
// 				loading,
// 				errorMessages,
// 				field,
// 			})}
// 		/>}
// 	/>
// }
