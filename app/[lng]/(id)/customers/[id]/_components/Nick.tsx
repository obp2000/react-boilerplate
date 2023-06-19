import type { Translation } from "@/app/i18n/dictionaries"
import type { SerializedCustomerObject } from "@/interfaces/customers"
import { TextField } from '@mui/material'
import { Controller, type Control, FieldErrors } from "react-hook-form"
import { errorText } from '@/app/_objects/formHelpers'

export default function Nick({
	control,
	labels: {
		nick,
	},
	busy,
	errorMessages,
	errors: {
		nick: error
	},
}: {
	control: Control<SerializedCustomerObject, any>
	labels: Translation['customer']
	busy: boolean
	errorMessages: Translation['errorMessages']
	errors: FieldErrors<SerializedCustomerObject>
}) {
	return <Controller name="nick"
		control={control}
		render={({ field }) => <TextField {...field}
			id="nick"
			label={`${nick} *`}
			size="small"
			fullWidth
			disabled={busy}
			error={!!error}
			helperText={errorText(errorMessages, error)}
		/>}
	/>
}
