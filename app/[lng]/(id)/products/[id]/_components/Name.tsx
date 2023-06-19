import type { Translation } from "@/app/i18n/dictionaries"
import type { SerializedProductObject } from "@/interfaces/products"
import { TextField } from '@mui/material'
import { Controller, type Control, FieldErrors } from "react-hook-form"
import { errorText } from '@/app/_objects/formHelpers'

export default function Name({
	control,
	labels: {
		name,
	},
	busy,
	errorMessages,
	errors: {
		name: error
	},
}: {
	control: Control<SerializedProductObject, any>
	labels: Translation['product']
	busy: boolean
	errorMessages: Translation['errorMessages']
	errors: FieldErrors<SerializedProductObject>
}) {
	return <Controller name="name"
		control={control}
		render={({ field }) => <TextField {...field}
			fullWidth
			id="name"
			className='col-span-3'
			label={`${name} *`}
			size="small"
			disabled={busy}
			error={!!error}
			helperText={errorText(errorMessages, error)}
		/>}
	/>
}
