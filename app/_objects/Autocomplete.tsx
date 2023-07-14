import {
	Autocomplete,
	CircularProgress,
	TextField,
} from '@mui/material'
import { useCallback, useState, useTransition } from 'react'
import { useController } from 'react-hook-form'

import { errorText, integerValue } from '@/app/_objects/formHelpers'
import { search } from './actions'

import type { Translation } from '@/app/i18n/dictionaries'
import type { CityAutocompleteProps } from '@/interfaces/cities'
import type { CustomerAutocompleteProps } from '@/interfaces/customers'
import type { AutocompleteProps, anyObject } from '@/interfaces/form'
import type { ProductAutocompleteProps } from '@/interfaces/products'
import type {
	AutocompleteInputChangeReason,
	TextFieldProps
} from '@mui/material'
import type {
	SyntheticEvent
} from 'react'
import type { ControllerRenderProps, FieldError } from 'react-hook-form'

export function isOptionEqualToValue(
	option: anyObject,
	value: anyObject | null
) {
	return value === null || option.id === value.id
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
	return function RenderInput({
		InputProps,
		inputProps,
		...params
	}: JSX.IntrinsicAttributes & TextFieldProps) {
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
	table,
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
	// const { city: init } = defaultValues as SerializedCustomerObject
	const [options, setOptions] = useState(init ? [init] : [])
	const idName = `${field.name}Id`
	const [isPending, startTransition] = useTransition()
	const onAutocompleteChange = useCallback((
		_: SyntheticEvent,
		newValue: anyObject
	) => {
		if (onChangeAction) {
			onChangeAction(newValue)
		}
		setValue(idName, newValue?.id)
		return onChange(newValue)
	}, [idName, onChange, onChangeAction, setValue])
	const onInputChange = useCallback((
		_: SyntheticEvent,
		term: string,
		reason: AutocompleteInputChangeReason
	) => {
		if (reason === 'input' &&
			typeof term === 'string' &&
			term.length > 1) {
			startTransition(async () => {
				const res =
					await search({ term, table })
				if (res.success) {
					setOptions(field.value
						? [field.value, ...res.objects]
						: res.objects)
				}
			})
		}
	}, [field.value, table])
	return <>
		<input
			type='number'
			hidden
			{...register(idName, { setValueAs: integerValue })}
			defaultValue={field.value?.id}
		/>
		<Autocomplete
			{...field}
			onChange={onAutocompleteChange}
			autoComplete
			includeInputInList
			loading={isPending}
			loadingText={<CircularProgress color="inherit" size={15} />}
			size='small'
			isOptionEqualToValue={isOptionEqualToValue}
			getOptionLabel={getOptionLabel}
			renderOption={(props, option) => <li key={option.id} {...props}>
				{getOptionLabel(option)}
			</li>}
			options={options}
			onInputChange={onInputChange}
			noOptionsText={notFound}
			className={className}
			renderInput={getRenderInput({
				label,
				error,
				busy,
				loading: isPending,
				errorMessages,
				field,
			})}
		/>
	</>
}


// export function onSearch(
// 	table: string,
// 	setData: Dispatch<SetStateAction<anyObject[]>>,
// 	// setBusy: Dispatch<SetStateAction<boolean>>,
// 	startTransition: TransitionStartFunction,
// 	currentValue: anyObject | null
// ) {
// 	return (_: SyntheticEvent, term: string, reason: AutocompleteInputChangeReason) => {
// 		if (reason === 'input' && typeof term === 'string' && term.length > 1) {
// 			startTransition(async () => {
// 				// setBusy(true)
// 				// const searchParams = new URLSearchParams()
// 				// searchParams.set('term', term)
// 				// fetch(`/api/${table}?${searchParams}`)
// 				// 	.then(res => res.json()
// 				// 		.then((results) => {
// 				// 			setData(currentValue ? [currentValue, ...results] : results)
// 				// 			// setBusy(false)
// 				// 		}))
// 				const res = await search({ term, table })
// 				if (res.success) {
// 					setData(currentValue ? [currentValue, ...res.objects] : res.objects)
// 				}
// 			})
// 		}
// 	}
// }
