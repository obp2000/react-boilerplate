import { errorText } from '@/app/_objects/formHelpers'
import type { Translation } from "@/app/i18n/dictionaries"
import type { RegisterValues } from "@/interfaces/users"
import { TextField } from '@mui/material'
import { useMemo } from 'react'
import {
	Controller,
	type Control,
	type FieldError,
	type FieldErrors
} from "react-hook-form"

export default function Password2({
	control,
	labels: {
		password2,
		password2HelpText
	},
	busy,
	errorMessages,
	errors
}: {
	control: Control<RegisterValues, any>
	labels: Translation['auth']
	busy: boolean
	errorMessages: Translation['errorMessages']
	errors: FieldErrors<RegisterValues>
}) {
	const objectError = useMemo(
		() => errors ? Object.values(errors).find(
			({ type }) => type === 'object')
			: undefined,
		[errors]) as FieldError
	return <Controller name="password2"
		control={control}
		render={({ field }) => <TextField {...field}
			type="password"
			id="password2"
			label={password2}
			autoComplete="new-password"
			variant="outlined"
			size="small"
			disabled={busy}
			error={!!objectError}
			helperText={errorText(errorMessages, objectError) ||
				password2HelpText}
		/>}
	/>
}
