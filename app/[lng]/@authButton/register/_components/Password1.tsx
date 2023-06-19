import { errorText } from '@/app/_objects/formHelpers'
import type { Translation } from "@/app/i18n/dictionaries"
import type { RegisterValues } from "@/interfaces/users"
import { TextField } from '@mui/material'
import {
	Controller,
	type Control,
	type FieldError,
	type FieldErrors
} from "react-hook-form"

export default function Password1({
	control,
	labels: {
		password1,
		password1HelpText
	},
	busy,
	errorMessages,
	errors: {
		password1: error
	},
}: {
	control: Control<RegisterValues, any>
	labels: Translation['auth']
	busy: boolean
	errorMessages: Translation['errorMessages']
	errors: FieldErrors<RegisterValues>
}) {
	return <Controller name="password1"
		control={control}
		render={({ field }) => <TextField {...field}
			type="password"
			id="password1"
			required
			label={password1}
			autoComplete="new-password"
			variant="outlined"
			size="small"
			disabled={busy}
			error={!!error}
			helperText={errorText(errorMessages, error as FieldError) ||
				password1HelpText}
		/>}
	/>
}
