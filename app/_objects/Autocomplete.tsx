import { Autocomplete, TextField } from '@mui/material'
import { debounce } from '@mui/material/utils'
import {
	useCallback,
	useEffect,
	useMemo,
	useState,
	useDeferredValue
} from 'react'
import { useController } from 'react-hook-form'

import { errorText, integerValue } from '@/app/_objects/formHelpers'
import { search } from './actions'
import { Field } from '@/app/components/Skeletons'

import type { Translation } from '@/app/i18n/dictionaries'
import type { CityAutocompleteProps } from '@/interfaces/cities'
import type { CustomerAutocompleteProps } from '@/interfaces/customers'
import type { AutocompleteProps, AnyObject } from '@/interfaces/form'
import type { ProductAutocompleteProps } from '@/interfaces/products'
import type { TextFieldProps } from '@mui/material'
import type { SyntheticEvent } from 'react'
import type { FieldError, RefCallBack } from 'react-hook-form'

export function isOptionEqualToValue(
	option: AnyObject,
	value: AnyObject | null
) {
	return value === null || option.id === value.id
}

export function getRenderInput({
	label,
	error,
	busy: disabled,
	// loading,
	errorMessages,
	ref,
}: {
	label?: string
	error?: FieldError
	busy: boolean
	// loading: boolean
	errorMessages: Translation['errorMessages']
	ref: RefCallBack
	// field: Omit<ControllerRenderProps, 'value' | 'onChange'>
}) {
	return function RenderInput({
		inputProps,
		...params
	}: JSX.IntrinsicAttributes & TextFieldProps) {
		// const endAdornment = <>
		// 	{loading ? <CircularProgress color="inherit" size={15} /> : null}
		// 	{InputProps?.endAdornment}
		// </>
		return <TextField {...params}
			{...{
				inputRef: ref,
				label,
				disabled,
				error: !!error,
				helperText: errorText(errorMessages, error),
				'aria-invalid': error ? "true" : "false",
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
	// init,
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
		field: { onChange, value, name, ref, ...field },
		fieldState: { error },
		// formState: { defaultValues },
	} = useController(props)
	const [inputValue, setInputValue] = useState('')
	const deferredInputValue = useDeferredValue(inputValue)
	const isStale = inputValue !== deferredInputValue
	const [options, setOptions] = useState<AnyObject[]>([])
	const idName = `${name}Id`
	const onAutocompleteChange = useCallback((
		_: SyntheticEvent,
		newValue: AnyObject
	) => {
		setOptions(newValue ? [newValue, ...options] : options)
		if (onChangeAction) {
			onChangeAction(newValue)
		}
		setValue(idName, newValue?.id)
		return onChange(newValue)
	}, [idName, onChange, onChangeAction, options, setValue])
	const fetch = useMemo(
		() =>
			debounce(
				async (
					term: string,
					callback: (objects?: readonly AnyObject[]) => void,
				) => {
					const res = await search({ term, table })
					if (res.success) {
						callback(res.objects)
					}
				},
				400,
			),
		[table],
	)
	useEffect(() => {
		let active = true
		if (deferredInputValue.length < 2) {
			setOptions(value ? [value] : [])
			return undefined
		}
		// startTransition(() => {
		fetch(deferredInputValue, (objects) => {
			if (active) {
				let newOptions: AnyObject[] = []
				if (value) {
					newOptions = [value]
				}
				if (objects) {
					newOptions = [...newOptions, ...objects]
				}
				setOptions(newOptions)
			}
		})
		return () => {
			active = false
		}
	}, [deferredInputValue, fetch, value])
	return <>
		<input
			type='number'
			hidden
			{...register(idName, { setValueAs: integerValue })}
			defaultValue={value?.id}
		/>
		<Autocomplete
			{...field}
			getOptionLabel={getOptionLabel}
			filterOptions={(x) => x}
			options={options}
			autoComplete
			includeInputInList
			filterSelectedOptions
			value={value}
			noOptionsText={notFound}
			onChange={onAutocompleteChange}
			onInputChange={(_, newInputValue) => {
				setInputValue(newInputValue)
			}}
			renderInput={getRenderInput({
				label,
				error,
				busy,
				// loading: isPending,
				errorMessages,
				ref,
			})}
			renderOption={(props, option) => <li
				key={option.id}
				{...props}
				className={`${props.className}${isStale ? ' transition-opacity opacity-70' : ''}`}
			>
				{getOptionLabel(option)}
			</li>}
			loading={isStale}
			// loadingText={<CircularProgress color="inherit" size={15} />}
			loadingText={<Field />}
			size='small'
			isOptionEqualToValue={isOptionEqualToValue}
			className={className}
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
