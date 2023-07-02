import { errorText } from '@/app/_objects/formHelpers'
import type { Translation } from "@/app/i18n/dictionaries"
import type { RegisterValues } from "@/interfaces/users"
import { TextField } from '@mui/material'
import type { FieldErrors, UseFormRegister } from "react-hook-form"

export default function Email({
	register,
	labels: {
		email,
	},
	busy,
	errorMessages,
	errors: {
		email: error
	},
}: {
	register: UseFormRegister<RegisterValues>
	labels: Partial<Translation['auth']>
	busy: boolean
	errorMessages: Translation['errorMessages']
	errors: FieldErrors<RegisterValues>
}) {
	return <TextField {...register('email')}
		required
		label={email}
		autoComplete="email"
		variant="outlined"
		size="small"
		disabled={busy}
		error={!!error}
		helperText={errorText(errorMessages, error)}
	/>
}
