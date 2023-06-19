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

export default function Name({
	control,
	labels: {
		name,
		nameHelpText
	},
	busy,
	errorMessages,
	errors: {
		name: error
	},
}: {
	control: Control<RegisterValues, any>
	labels: Translation['auth']
	busy: boolean
	errorMessages: Translation['errorMessages']
	errors: FieldErrors<RegisterValues>
}) {
	return <Controller name="name"
		control={control}
		render={({ field }) => <TextField {...field}
			id="name"
			required
			label={name}
			autoComplete="name"
			variant="outlined"
			size="small"
			disabled={busy}
			error={!!error}
			helperText={errorText(errorMessages, error as FieldError) || nameHelpText}
		/>}
	/>
}
