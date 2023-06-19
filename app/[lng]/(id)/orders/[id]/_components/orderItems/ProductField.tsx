import {
  getRenderInput,
  getRenderOption,
  isOptionEqualToValue,
  onSearch
} from '@/app/_objects/formHelpers'
import type { ProductFieldProps } from '@/interfaces/orders'
import { Autocomplete } from '@mui/material'
import { useState } from 'react'
import { Controller, type FieldError } from "react-hook-form"

export default function ProductField({
	index,
	initialValues: {
		product
	},
	getProductOptionLabel,
	busy,
	errors,
	errorMessages,
	setValue,
	notFound,
	control,
}: ProductFieldProps) {
	const [currentValue, setCurrentValue] = useState(product)
	const [options, setOptions] = useState(product ? [product] : [])
	const [loading, setLoading] = useState(false)
	return <Controller name={`orderItems.${index}.product`}
		control={control}
		render={({ field: { ref, onChange, ...field } }) => <Autocomplete
			{...field}
			id={`orderItems.${index}.product`}
			onChange={(_, newValue) => {
				if (newValue) {
					setValue(`orderItems.${index}.price`, newValue.price as number)
				}
				setCurrentValue(newValue)
				onChange(newValue)
			}}
			autoComplete
			includeInputInList
			filterSelectedOptions
			size='small'
			isOptionEqualToValue={isOptionEqualToValue}
			getOptionLabel={getProductOptionLabel}
			renderOption={getRenderOption(getProductOptionLabel)}
			options={options}
			// filterOptions={(x) => x}
			onInputChange={onSearch('/products/', setOptions, setLoading, currentValue)}
			noOptionsText={notFound}
			renderInput={getRenderInput({
				label: '',
				error: errors?.product as FieldError,
				busy,
				loading,
				errorMessages,
				field,
				ref
			})}
		/>}
	/>
}
