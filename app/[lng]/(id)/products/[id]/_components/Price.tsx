import type { Translation } from "@/app/i18n/dictionaries"
import type { SerializedProductObject } from "@/interfaces/products"
import { TextField } from '@mui/material'
import { Controller, type Control, FieldErrors } from "react-hook-form"
import { errorText, unitsLabel } from '@/app/_objects/formHelpers'

export default function Price({
	control,
	labels: {
		price,
	},
	busy,
	errorMessages,
	errors: {
		price: error
	},
	units: {
		meter_short: meterShort
	},
}: {
	control: Control<SerializedProductObject, any>
	labels: Translation['product']
	busy: boolean
	errorMessages: Translation['errorMessages']
	errors: FieldErrors<SerializedProductObject>
	units: Translation['units']
}) {
	return <Controller name="price"
		control={control}
		render={({ field }) => <TextField {...field}
			type='number'
			id="price"
			label={`${price} *`}
			size="small"
			disabled={busy}
			InputProps={unitsLabel(`₽/${meterShort}`)}
			inputProps={{
				inputMode: 'numeric',
			}}
			error={!!error}
			helperText={errorText(errorMessages, error)}
		/>}
	/>
}
