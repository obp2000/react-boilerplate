import { errorText } from '@/app/_objects/formHelpers'
import type { Translation } from "@/app/i18n/dictionaries"
import { TextField } from '@mui/material'
import type { SignInOptions } from "next-auth/react"
import {
	type FieldError,
	type FieldErrors,
	type UseFormRegister
} from "react-hook-form"

export default function Password({
	register,
	labels: {
		password,
	},
	busy,
	errorMessages,
	errors: {
		password: error
	},
}: {
	register: UseFormRegister<SignInOptions>
	labels: {
		name: string
		password: string
	}
	busy: boolean
	errorMessages: Translation['errorMessages']
	errors: FieldErrors<SignInOptions>
}) {
	return <TextField {...register('password')}
		type='password'
		label={`${password} *`}
		autoComplete="current-password"
		variant="outlined"
		size="small"
		disabled={busy}
		error={!!error}
		helperText={errorText(errorMessages, error as FieldError)}
	/>
}
