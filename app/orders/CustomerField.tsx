import { getGetOptionLabel } from '@/app/customers/helpers'
import {
	getRenderInput,
	getRenderOption, isOptionEqualToValue, onSearch
} from '@/app/form/helpers'
import type { Translation } from '@/app/i18n/dictionaries'
import type {
	OrderObject as Order
} from '@/interfaces/orders'
import Autocomplete from '@mui/material/Autocomplete'
import { useState } from 'react'
import {
	Controller,
	type FieldError,
	type FieldErrors, type Control
} from "react-hook-form"


type Props = {
	label: string
	labels: Translation['customer']
	busy: boolean
	errors: FieldErrors<Order>
	errorMessages: Translation['errorMessages']
	notFound: string,
	control: Control<Order>
	initialValues: Order
}

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
}: Props) {
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

		// renderInput={(params) => <TextField {...params}
		// 	label={`${label} *`}
		// 	disabled={busy}
		// 	error={errors?.customerId ? true : undefined}
		// 	helperText={errors?.customerId
		// 		? errorMessages[errors.customerId.message as keyof Translation['errorMessages']]
		// 		: undefined}
		// 	InputProps={{
		// 		...params.InputProps,
		// 		endAdornment: <>
		// 				{loading ? <CircularProgress color="inherit" size={15} /> : null}
		// 				{params.InputProps.endAdornment}
		// 			</>,
		// 	}}
		// 	inputProps={{
		// 		...params.inputProps,
		// 		autoComplete: 'new-password',
		// 	}}
		// />}

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
        // /