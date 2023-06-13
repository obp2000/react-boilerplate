import {
  getRenderInput,
  getRenderOption,
  isOptionEqualToValue,
  onSearch
} from '@/app/_objects/formHelpers'
import type { CityFieldProps } from '@/interfaces/customers'
import { Autocomplete } from '@mui/material'
import { useState } from 'react'
import { Controller, type FieldError } from "react-hook-form"
import { getGetOptionLabel } from './cities/helpers'

export default function CityField({
	labels,
	busy,
	errors: {
		city: cityError
	},
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
	return <Controller
		name="city"
		control={control}
		render={({ field: { ref, onChange, ...field } }) => <Autocomplete
			{...field}
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
			renderInput={getRenderInput({
				label: `${labels.city} *`,
				error: cityError as FieldError,
				busy,
				loading,
				errorMessages,
				field,
				ref
			})}
		/>}
	/>
}
