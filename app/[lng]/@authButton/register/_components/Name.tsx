import { errorText } from '@/app/_objects/formHelpers'
import type { Translation } from "@/app/i18n/dictionaries"
import type { RegisterValues } from "@/interfaces/users"
import { TextField } from '@mui/material'
import type { FieldErrors, UseFormRegister } from "react-hook-form"

export default function Name({
	register,
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
	register: UseFormRegister<RegisterValues>
	labels: Partial<Translation['auth']>
	busy: boolean
	errorMessages: Translation['errorMessages']
	errors: FieldErrors<RegisterValues>
}) {
	return <TextField {...register('name')}
		required
		label={name}
		autoComplete="name"
		variant="outlined"
		size="small"
		disabled={busy}
		error={!!error}
		helperText={errorText(errorMessages, error) || nameHelpText}
	/>
}
