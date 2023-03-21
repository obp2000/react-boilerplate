import { onSearch } from '@/app/form/helpers'
import type { Translation } from '@/app/i18n/dictionaries'
import Autocomplete from '@mui/material/Autocomplete'
import CircularProgress from '@mui/material/CircularProgress'
import TextField from '@mui/material/TextField'
import { useState } from 'react'
import type { FieldErrors, UseFormSetValue } from "react-hook-form"
import type { Values, OrderItem } from '@/interfaces/orders'

type ProductFieldProps = {
	index: number
	product: OrderItem['product']
	label: string
	getProductOptionLabel: (product: OrderItem['product']) => string
	busy: boolean
	errors: FieldErrors<Values>
	errorMessages: Translation['errorMessages']
	setValue: UseFormSetValue<Values>
	notFound: string
}

export default function ProductField({
	index,
	product,
	label,
	getProductOptionLabel,
	busy,
	errors,
	errorMessages,
	setValue,
	notFound,
}: ProductFieldProps) {
	const [products, setProducts] = useState(product ? [product] : [])
	const [loading, setLoading] = useState(false)
	const productError = (errors?.orderItems?.[index as keyof FieldErrors['root']] as
		FieldErrors['root'] | undefined)?.product
	return <Autocomplete
		id={`orderItems.${index}.product`}
		onChange={(_, product) => {
			if (product) {
				setValue(`orderItems.${index}.price`, product.price)
			}
			setValue(`orderItems.${index}.productId`, product?.id || null)
		}}
		defaultValue={product}
		autoComplete
		includeInputInList
		filterSelectedOptions
		size='small'
		isOptionEqualToValue={(option, value) => {
			return value === undefined || option?.id === value?.id
		}}
		getOptionLabel={getProductOptionLabel}
		renderOption={(props, product) => <li {...props} key={product?.id || -1}>
			{getProductOptionLabel(product)}
		</li>}
		options={products}
		// filterOptions={(x) => x}
		onInputChange={onSearch('/products/', setProducts, setLoading)}
		noOptionsText={notFound}
		renderInput={(params) => <TextField {...params}
			label={label}
			disabled={busy}
			error={!!productError}
			helperText={productError
				? errorMessages[productError.message as keyof Translation['errorMessages']]
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
