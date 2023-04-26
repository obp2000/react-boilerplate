import {
    getRenderInput,
    getRenderOption,
    isOptionEqualToValue,
    onSearch
} from '@/app/_objects/formHelpers'
import type { CustomerFieldProps } from '@/interfaces/orders'
import Autocomplete from '@mui/material/Autocomplete'
import { useState } from 'react'
import { Controller, type FieldError } from "react-hook-form"
import { getGetOptionLabel } from '@/app/customer/helpers'

export default function CustomerField({
	label,
	labels,
	busy,
	errors,
	errorMessages,
	notFound,
	control,
	initialValues: {
		customer
	}
}: CustomerFieldProps) {
	const [currentValue, setCurrentValue] = useState(customer)
	const [options, setOptions] = useState(customer ? [customer] : [])
	const [loading, setLoading] = useState(false)
	const getOptionLabel = getGetOptionLabel(labels)
	const error = errors?.customer as FieldError
	return <Controller
		name="customer"
		control={control}
		render={({ field: { ref, onChange, ...field } }) => <Autocomplete {...field}
			id='customer'
			onChange={(_, newValue) => {
				if (newValue) {
					setCurrentValue(newValue)
				}
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
			onInputChange={onSearch('/customers/', setOptions, setLoading, currentValue)}
			noOptionsText={notFound}
			renderInput={getRenderInput({ label, error, busy, loading, errorMessages, field, ref })}
		/>}
	/>
}
