import type { Translation } from "@/app/i18n/dictionaries"
import { TextField } from '@mui/material'
import type { SignInOptions } from "next-auth/react"
import {
	Controller,
	type Control,
	type FieldErrors,
	type FieldError
} from "react-hook-form"
import { errorText } from '@/app/_objects/formHelpers'

export default function Name({
	control,
	labels: {
		name,
	},
	busy,
	errorMessages,
	errors: {
		name: error
	},
}: {
	control: Control<SignInOptions, any>
	labels: {
		name: string
		password: string
	}
	busy: boolean
	errorMessages: Translation['errorMessages']
	errors: FieldErrors<SignInOptions>
}) {
	return <Controller name="name"
		control={control}
		render={({ field }) => <TextField {...field}
			id="name"
			label={`${name} *`}
			autoComplete="name"
			variant="outlined"
			size="small"
			disabled={busy}
			error={!!error}
			helperText={errorText(errorMessages, error as FieldError)}
		/>}
	/>
}
