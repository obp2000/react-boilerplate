import {
	getRenderInput,
	getRenderOption, isOptionEqualToValue, onSearch
} from '@/app/form/helpers'
import type { Translation } from '@/app/i18n/dictionaries'
import type { OrderObject as Order } from '@/interfaces/orders'
import Autocomplete from '@mui/material/Autocomplete'
import { useState } from 'react'
import {
	Controller,
	type FieldError,
	type FieldErrors,
	type UseFormSetValue,
	type Control
} from "react-hook-form"

type ProductFieldProps = {
	index: number
	product: Order['orderItems'][number]['product']
	label: string
	getProductOptionLabel: (product: Order['orderItems'][number]['product']) => string
	busy: boolean
	errors: FieldErrors<Order>
	errorMessages: Translation['errorMessages']
	setValue: UseFormSetValue<Order>
	notFound: string
	control: Control<Order>
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
	control,
}: ProductFieldProps) {
	const [currentValue, setCurrentValue] = useState(product)
	const [options, setOptions] = useState(product ? [product] : [])
	const [loading, setLoading] = useState(false)
	const error = (errors?.orderItems?.[index as
		keyof FieldErrors['root']])?.product as FieldError
	return <Controller name={`orderItems.${index}.product`}
		control={control}
		render={({ field: { ref, onChange, ...field } }) => <Autocomplete {...field}
			id={`orderItems.${index}.product`}
			onChange={(_, newValue) => {
				if (newValue) {
					setValue(`orderItems.${index}.price`, newValue.price)
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
			renderInput={getRenderInput({ label: '', error, busy, loading, errorMessages, field, ref })}
		/>}
	/>
}

        // <Controller name="customer"
        //   control={control}
        //   render={({ field: { ref, onChange, ...field } }) => <Autocomplete {...field}
        //     onChange={(_, data) => onChange(data)}
        //     id='customer'
        //     size='small'
        //     getOptionLabel={getCustomerOptionLabel}
        //     renderOption={(props, customer) => <li {...props} key={customer?.id || -1}>
        //       {getCustomerOptionLabel(customer)}
        //     </li>}
        //     isOptionEqualToValue={(option, value) => option.id === value.id}
        //     options={customers}
        //     // filterOptions={(x) => x}
        //     onInputChange={onSearch('/customers/', setCustomers, setLoading)}
        //     noOptionsText={notFound}
        //     renderInput={(params) => <TextField {...params} {...field}
        //       inputRef={ref}
        //       label={`${labels.customer} *`}
        //       disabled={busy}
        //       error={errors?.customer ? true : undefined}
        //       helperText={errors?.customer
        //         ? errorMessages[errors.customer.message as keyof Translation['errorMessages']]
        //         : undefined}
        //       InputProps={{
        //         ...params.InputProps,
        //         endAdornment: <>
        //           {loading ? <CircularProgress color="inherit" size={15} /> : null}
        //           {params.InputProps.endAdornment}
        //         </>,
        //       }}
        //     />}
        //   />}


	// renderInput={(params) => <TextField {...params}
	// 	label={label}
	// 	disabled={busy}
	// 	error={!!error}
	// 	helperText={!!error
	// 		? errorMessages[error.message as keyof Translation['errorMessages']]
	// 		: undefined}
	// 	InputProps={{
	// 		...params.InputProps,
	// 		endAdornment: <>
	// 			{loading ? <CircularProgress color="inherit" size={15} /> : null}
	// 			{params.InputProps.endAdornment}
	// 		</>,
	// 	}}
	// 	inputProps={{
	// 		...params.inputProps,
	// 		autoComplete: 'new-password',
	// 	}}
	// />}

		// renderOption={(props, product) => <li {...props} key={product?.id || -1}>
		// 	{getProductOptionLabel(product)}
		// </li>}
