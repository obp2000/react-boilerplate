import { getGetOptionLabel } from '@/app/customers/helpers'
import { onSearch } from '@/app/form/helpers'
import type { Translation } from '@/app/i18n/dictionaries'
import Autocomplete from '@mui/material/Autocomplete'
import CircularProgress from '@mui/material/CircularProgress'
import TextField from '@mui/material/TextField'
import { useState } from 'react'
import type { FieldErrors, UseFormSetValue } from "react-hook-form"
import type {
	OrderObject as Order,
	Values,
} from '@/interfaces/orders'

type CityFieldProps = {
	customer: Order['customer']
	label: string
	labels: Translation['customer']
	busy: boolean
	errors: FieldErrors<Values>
	errorMessages: Translation['errorMessages']
	setValue: UseFormSetValue<Values>
	notFound: string
}

export default function CustomerField({
	customer,
	label,
	labels,
	busy,
	errors,
	errorMessages,
	setValue,
	notFound
}: CityFieldProps) {
  const [customers, setCustomers] = useState(customer ? [customer] : [])
  const [loading, setLoading] = useState(false)
  const getOptionLabel = getGetOptionLabel(labels)
	return <Autocomplete
		id='customer'
		onChange={(_, customer) => {
			return setValue('customerId', customer?.id)
		}}
		defaultValue={customer}
		autoComplete
		includeInputInList
		filterSelectedOptions
		size='small'
		isOptionEqualToValue={(option, value) => {
			// console.log('option , value ', option, value)
			return value === undefined || option.id === value.id
		}}
		getOptionLabel={getOptionLabel}
		renderOption={(props, customer) => <li {...props} key={customer?.id || -1}>
			{getOptionLabel(customer)}
		</li>}
		options={customers}
		// filterOptions={(x) => x}
		onInputChange={onSearch('/customers/', setCustomers, setLoading)}
		noOptionsText={notFound}
		renderInput={(params) => <TextField {...params}
			label={`${label} *`}
			disabled={busy}
			error={errors?.customerId ? true : undefined}
			helperText={errors?.customerId
				? errorMessages[errors.customerId.message as keyof Translation['errorMessages']]
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