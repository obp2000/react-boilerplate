import { errorText } from '@/app/_objects/formHelpers'
import type { Translation } from "@/app/i18n/dictionaries"
import type { RegisterValues } from "@/interfaces/users"
import { TextField } from '@mui/material'
import {
	Controller,
	type Control,
	type FieldErrors
} from "react-hook-form"

export default function Email({
	control,
	labels: {
		email,
	},
	busy,
	errorMessages,
	errors: {
		email: error
	},
}: {
	control: Control<RegisterValues, any>
	labels: Translation['auth']
	busy: boolean
	errorMessages: Translation['errorMessages']
	errors: FieldErrors<RegisterValues>
}) {
	return <Controller name="email"
		control={control}
		render={({ field }) => <TextField {...field}
			id="email"
			required
			label={email}
			autoComplete="email"
			variant="outlined"
			size="small"
			disabled={busy}
			error={!!error}
			helperText={errorText(errorMessages, error)}
		/>}
	/>
}
