import { getGetOptionLabel } from '@/app/customers/cities/helpers'
import {
	getRenderInput,
	getRenderOption, isOptionEqualToValue, onSearch
} from '@/app/form/helpers'
import type { Translation } from '@/app/i18n/dictionaries'
import type { CustomerObject as Customer } from '@/interfaces/customers'
import Autocomplete from '@mui/material/Autocomplete'
import { useState } from 'react'
import {
	Controller,
	type Control, type FieldError, type FieldErrors
} from "react-hook-form"

type CityFieldProps = {
	labels: Translation['customer']['city']
	busy: boolean
	errors: FieldErrors<Customer>
	errorMessages: Translation['errorMessages']
	notFound: string
	control: Control<Customer>
	initialValues: Customer
}

export default function CityField({
	labels,
	busy,
	errors,
	errorMessages,
	notFound,
	control,
	initialValues: {
		city
	},
}: CityFieldProps) {
	const [currentValue, setCurrentValue] = useState(city)
	const [options, setOptions] = useState(city ? [city] : [])
	const [loading, setLoading] = useState(false)
	const getOptionLabel = getGetOptionLabel(labels)
	// const idFieldName = 'cityId'
	const error = errors?.city as FieldError
	const label = `${labels.city} *`
	return <Controller
		name="city"
		control={control}
		render={({ field: { ref, onChange, ...field } }) => <Autocomplete {...field}
			id="city"
			onChange={(_, newValue) => {
				if (newValue) {
					setCurrentValue(newValue)
				}
				return onChange(newValue)
			}}
			defaultValue={city}
			autoComplete
			includeInputInList
			filterSelectedOptions
			size='small'
			isOptionEqualToValue={isOptionEqualToValue}
			getOptionLabel={getOptionLabel}
			renderOption={getRenderOption(getOptionLabel)}
			options={options}
			// filterOptions={(x) => x}
			onInputChange={onSearch('/cities/', setOptions, setLoading, currentValue)}
			noOptionsText={notFound}
			renderInput={getRenderInput({ label, error, busy, loading, errorMessages, field, ref })}
		/>}
	/>
}
