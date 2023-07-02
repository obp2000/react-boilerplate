import {
  getRenderInput,
  getRenderOption,
  isOptionEqualToValue,
  onSearch
} from '@/app/_objects/formHelpers'
import type { Translation } from '@/app/i18n/dictionaries'
import { City } from '@/interfaces/cities'
import type { SerializedCustomerObject } from '@/interfaces/customers'
import { Autocomplete, CircularProgress } from '@mui/material'
import { useState } from 'react'
import {
  ControllerFieldState,
  ControllerRenderProps,
  UseFormStateReturn
} from "react-hook-form"

type Props = {
	label: string
	getOptionLabel: (customer: City) => string
	busy: boolean
	errorMessages: Translation['errorMessages']
	notFound: string
}

export default function renderCity({
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
		field: ControllerRenderProps<SerializedCustomerObject, 'city'>
		fieldState: ControllerFieldState
		formState: UseFormStateReturn<SerializedCustomerObject>
	}) => {
		const [loading, setLoading] = useState(false)
		const { city: init } = defaultValues as SerializedCustomerObject
		const [options, setOptions] = useState(init ? [init] : [])
		// console.log('city options ', options)
		return <Autocomplete
			{...field}
			onChange={(_, newValue) => onChange(newValue)}
			autoComplete
			includeInputInList
			// filterSelectedOptions
			loading={loading}
			loadingText={<CircularProgress color="inherit" size={15} />}
			size='small'
			isOptionEqualToValue={isOptionEqualToValue}
			getOptionLabel={getOptionLabel}
			renderOption={getRenderOption(getOptionLabel)}
			options={options}
			onInputChange={onSearch('/cities/', setOptions, setLoading, field.value)}
			noOptionsText={notFound}
			renderInput={getRenderInput({
				label: `${label} *`,
				error,
				busy,
				loading,
				errorMessages,
				field,
			})}
		/>
	}
}


// export function CityField({
// 	labels: {
// 		city: {
// 			city: name,
// 			pindex,
// 		}
// 	},
// 	busy,
// 	// errors: {
// 	// 	city: error
// 	// },
// 	errorMessages,
// 	notFound,
// 	control,
// 	// initialValues: {
// 	// 	city
// 	// },
// }: CityFieldProps) {
// 	// const [currentValue, setCurrentValue] = useState(city)
// 	// const [options, setOptions] = useState(city ? [city] : [])
// 	// const [loading, setLoading] = useState(false)
// 	// const getOptionLabel = getGetOptionLabel(pindex)
// 	console.log('city ')
// 	return <Controller
// 		name="city"
// 		control={control}
// 		render={({
// 			field: { ref, onChange, ...field },
// 			fieldState: { error },
// 			formState: { defaultValues },
// 		}) => {
// 			const [loading, setLoading] = useState(false)
// 			const getOptionLabel = getGetOptionLabel(pindex)
// 			const { city } = defaultValues as SerializedCustomerObject
// 			const [value, setValue] = useState(city)
// 			const [options, setOptions] = useState(city ? [city] : [])
// 			console.log('city defaultValues ', city)
// 			return <Autocomplete
// 				{...field}
// 				id="city"
// 				onChange={(_, newValue) => {
// 					if (newValue) {
// 						setValue(newValue)
// 					}
// 					return onChange(newValue)
// 				}}
// 				// defaultValue={city}
// 				autoComplete
// 				includeInputInList
// 				filterSelectedOptions
// 				size='small'
// 				isOptionEqualToValue={isOptionEqualToValue}
// 				getOptionLabel={getOptionLabel}
// 				renderOption={getRenderOption(getOptionLabel)}
// 				options={options}
// 				onInputChange={onSearch('/cities/', setOptions, setLoading, value)}
// 				noOptionsText={notFound}
// 				renderInput={getRenderInput({
// 					label: `${name} *`,
// 					error,
// 					busy,
// 					loading,
// 					errorMessages,
// 					field,
// 					ref
// 				})}
// 			/>
// 		}}
// 	/>
// }
