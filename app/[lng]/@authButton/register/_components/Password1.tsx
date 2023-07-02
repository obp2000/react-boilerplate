import { errorText } from '@/app/_objects/formHelpers'
import type { Translation } from "@/app/i18n/dictionaries"
import type { RegisterValues } from "@/interfaces/users"
import { TextField } from '@mui/material'
import type { FieldErrors, UseFormRegister } from "react-hook-form"

export default function Password1({
	register,
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
	register: UseFormRegister<RegisterValues>
	labels: Partial<Translation['auth']>
	busy: boolean
	errorMessages: Translation['errorMessages']
	errors: FieldErrors<RegisterValues>
}) {
	return <TextField {...register('password1')}
		type="password"
		required
		label={password1}
		autoComplete="new-password"
		variant="outlined"
		size="small"
		disabled={busy}
		error={!!error}
		helperText={errorText(errorMessages, error) ||
			password1HelpText}
	/>
}
