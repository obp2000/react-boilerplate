import { getGetOptionLabel } from '@/app/customers/cities/helpers'
import { onSearch } from '@/app/form/helpers'
import type { Translation } from '@/app/i18n/dictionaries'
import Autocomplete from '@mui/material/Autocomplete'
import CircularProgress from '@mui/material/CircularProgress'
import TextField from '@mui/material/TextField'
import { useState } from 'react'
import type { FieldErrors, UseFormSetValue } from "react-hook-form"
import type {
	CustomerObject as Customer,
	Values,
} from '@/interfaces/customers'

type CityFieldProps = {
	city: Customer['city']
	labels: Translation['customer']['city']
	busy: boolean
	errors: FieldErrors<Values>
	errorMessages: Translation['errorMessages']
	setValue: UseFormSetValue<Values>
	notFound: string
}

export default function CityField({
	city,
	labels,
	busy,
	errors,
	errorMessages,
	setValue,
	notFound
}: CityFieldProps) {
	const [cities, setCities] = useState(city ? [city] : [])
	const [loading, setLoading] = useState(false)
	const getOptionLabel = getGetOptionLabel(labels)
	return <Autocomplete
		id='city'
		onChange={(_, city) => {
			return setValue('cityId', city?.id)
		}}
		defaultValue={city}
		autoComplete
		includeInputInList
		filterSelectedOptions
		size='small'
		isOptionEqualToValue={(option, value) => {
			// console.log('option , value ', option, value)
			return value === undefined || option.id === value.id
		}}
		getOptionLabel={getOptionLabel}
		renderOption={(props, city) => <li {...props} key={city?.id || -1}>
			{getOptionLabel(city)}
		</li>}
		options={cities}
		// filterOptions={(x) => x}
		onInputChange={onSearch('/cities/', setCities, setLoading)}
		noOptionsText={notFound}
		renderInput={(params) => <TextField {...params}
			label={`${labels.city} *`}
			disabled={busy}
			error={errors?.cityId ? true : undefined}
			helperText={errors?.cityId
				? errorMessages[errors.cityId.message as keyof Translation['errorMessages']]
				: undefined}
			InputProps={{
				...params.InputProps,
				endAdornment: <>
						{loading ? <CircularProgress color="inherit" size={15} /> : null}
						{params.InputProps.endAdornment}
					</>,
			}}
			inputProps={{
				...params.inputProps,
				autoComplete: 'new-password',
			}}
		/>}
	/>
}
