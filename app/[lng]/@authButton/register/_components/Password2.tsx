import { errorText } from '@/app/_objects/formHelpers'
import type { Translation } from "@/app/i18n/dictionaries"
import type { RegisterValues } from "@/interfaces/users"
import { TextField } from '@mui/material'
import { useMemo } from 'react'
import type {
	FieldError,
	FieldErrors,
	UseFormRegister
} from "react-hook-form"

export default function Password2({
	register,
	labels: {
		password2,
		password2HelpText
	},
	busy,
	errorMessages,
	errors
}: {
	register: UseFormRegister<RegisterValues>
	labels: Partial<Translation['auth']>
	busy: boolean
	errorMessages: Translation['errorMessages']
	errors: FieldErrors<RegisterValues>
}) {
	const objectError = useMemo(
		() => errors ? Object.values(errors).find(
			({ type }) => type === 'object')
			: undefined,
		[errors]) as FieldError
	return <TextField {...register('password2')}
		type="password"
		label={password2}
		autoComplete="new-password"
		variant="outlined"
		size="small"
		disabled={busy}
		error={!!objectError}
		helperText={errorText(errorMessages, objectError) ||
			password2HelpText}
	/>
}
