import type { Translation } from "@/app/i18n/dictionaries"
import { TextField } from '@mui/material'
import type { SignInOptions } from "next-auth/react"
import type {
	FieldErrors,
	FieldError,
	UseFormRegister
} from "react-hook-form"
import { errorText } from '@/app/_objects/formHelpers'

export default function Name({
	register,
	labels: {
		name,
	},
	busy,
	errorMessages,
	errors: {
		name: error
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
	return <TextField {...register('name')}
		label={`${name} *`}
		autoComplete="name"
		variant="outlined"
		size="small"
		disabled={busy}
		error={!!error}
		helperText={errorText(errorMessages, error as FieldError)}
	/>
}
