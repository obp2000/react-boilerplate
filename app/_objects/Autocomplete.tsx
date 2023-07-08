import {
	Autocomplete,
	CircularProgress,
	TextField,
} from '@mui/material'
import { useState } from 'react'
import { useController } from 'react-hook-form'

import { errorText, integerValue } from '@/app/_objects/formHelpers'

import type { Translation } from '@/app/i18n/dictionaries'
import type { City, CityAutocompleteProps } from '@/interfaces/cities'
import type { Customer, CustomerAutocompleteProps } from '@/interfaces/customers'
import type { AutocompleteProps } from '@/interfaces/form'
import type { Product, ProductAutocompleteProps } from '@/interfaces/products'
import type {
	AutocompleteInputChangeReason,
	TextFieldProps
} from '@mui/material'
import type { Dispatch, SetStateAction, SyntheticEvent } from 'react'
import type { ControllerRenderProps, FieldError } from 'react-hook-form'

type anyObject = City | Customer | Product

export function isOptionEqualToValue(option: anyObject, value: anyObject | null) {
	return value === null || option.id === value.id
}

export function onSearch(
	searchPath: string,
	setData: Dispatch<SetStateAction<anyObject[]>>,
	setBusy: Dispatch<SetStateAction<boolean>>,
	currentValue: anyObject | null
) {
	return (_: SyntheticEvent, term: string, reason: AutocompleteInputChangeReason) => {
		if (reason === 'input' && typeof term === 'string' && term.length > 1) {
			setBusy(true)
			const searchParams = new URLSearchParams()
			searchParams.set('term', term)
			return fetch(`/api/${searchPath}?${searchParams}`)
				.then(res => res.json()
					.then((results) => {
						setData(currentValue ? [currentValue, ...results] : results)
						setBusy(false)
					}))
		}
	}
}

export function getRenderInput({
	label,
	error,
	busy: disabled,
	loading,
	errorMessages,
	field: {
		ref,
		...field
	},
}: {
	label?: string
	error?: FieldError
	busy: boolean
	loading: boolean
	errorMessages: Translation['errorMessages']
	field: Omit<ControllerRenderProps, 'onChange'>
}) {
	return ({
		InputProps,
		inputProps,
		...params
	}: JSX.IntrinsicAttributes & TextFieldProps) => {
		const endAdornment = <>
			{loading ? <CircularProgress color="inherit" size={15} /> : null}
			{InputProps?.endAdornment}
		</>
		return <TextField {...params} {...field}
			{...{
				inputRef: ref,
				label,
				disabled,
				error: !!error,
				helperText: errorText(errorMessages, error),
				'aria-invalid': error ? "true" : "false",
				InputProps: { ...InputProps, endAdornment },
				inputProps: { ...inputProps, autoComplete: 'new-password' },
			}}
		/>
	}
}

export default function AutocompleteComp(props: CityAutocompleteProps): JSX.Element
export default function AutocompleteComp(props: CustomerAutocompleteProps): JSX.Element 
export default function AutocompleteComp(props: ProductAutocompleteProps): JSX.Element 
export default function AutocompleteComp({
	searchPath,
	label,
	init,
	getOptionLabel,
	busy,
	errorMessages,
	notFound,
	onChangeAction,
	className,
	register,
	setValue,
	...props
}: AutocompleteProps): JSX.Element {
	const {
		field: { onChange, ...field },
		fieldState: { error },
		// formState: { defaultValues },
	} = useController(props)
	const [loading, setLoading] = useState(false)
	// const { city: init } = defaultValues as SerializedCustomerObject
	const [options, setOptions] = useState(init ? [init] : [])
	const idName = `${field.name}Id`
	return <>
		<input
			type='number'
			hidden
			{...register(idName, { setValueAs: integerValue })}
			defaultValue={field.value?.id}
		/>
		<Autocomplete
			{...field}
			onChange={(_, newValue) => {
				if (onChangeAction) {
					onChangeAction(newValue)
				}
				setValue(idName, newValue?.id)
				return onChange(newValue)
			}}
			autoComplete
			includeInputInList
			loading={loading}
			loadingText={<CircularProgress color="inherit" size={15} />}
			size='small'
			isOptionEqualToValue={isOptionEqualToValue}
			getOptionLabel={getOptionLabel}
			// renderOption={getRenderOption(getOptionLabel)}
			renderOption={(props, option) => <li key={option.id} {...props}>
				{getOptionLabel(option)}
			</li>}
			options={options}
			onInputChange={onSearch(searchPath, setOptions, setLoading, field.value)}
			noOptionsText={notFound}
			className={className}
			renderInput={getRenderInput({
				label,
				error,
				busy,
				loading,
				errorMessages,
				field,
			})}
		/>
	</>
}

// export function renderCity({
// 	label,
// 	getOptionLabel,
// 	busy,
// 	errorMessages,
// 	notFound,
// }: RenderCity) {
// 	return ({
// 		field: { onChange, ...field },
// 		fieldState: { error },
// 		formState: { defaultValues },
// 	}: ControllerRender) => {
// 		const [loading, setLoading] = useState(false)
// 		const { city: init } = defaultValues as SerializedCustomerObject
// 		const [options, setOptions] = useState(init ? [init] : [])
// 		// console.log('city options ', options)
// 		return <Autocomplete
// 			{...field}
// 			onChange={(_, newValue) => onChange(newValue)}
// 			autoComplete
// 			includeInputInList
// 			// filterSelectedOptions
// 			loading={loading}
// 			loadingText={<CircularProgress color="inherit" size={15} />}
// 			size='small'
// 			isOptionEqualToValue={isOptionEqualToValue}
// 			getOptionLabel={getOptionLabel}
// 			renderOption={getRenderOption(getOptionLabel)}
// 			options={options}
// 			onInputChange={onSearch('/cities/', setOptions, setLoading, field.value)}
// 			noOptionsText={notFound}
// 			renderInput={getRenderInput({
// 				label: `${label} *`,
// 				error,
// 				busy,
// 				loading,
// 				errorMessages,
// 				field,
// 			})}
// 		/>
// 	}
// }


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
