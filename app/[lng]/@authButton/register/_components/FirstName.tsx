import type { Translation } from "@/app/i18n/dictionaries"
import type { RegisterValues } from "@/interfaces/users"
import { TextField } from '@mui/material'
import {
	Controller,
	type Control
} from "react-hook-form"

export default function FirstName({
	control,
	labels: {
		firstName,
	},
	busy,
}: {
	control: Control<RegisterValues, any>
	labels: Translation['auth']
	busy: boolean
}) {
	return <Controller name="firstName"
		control={control}
		render={({ field }) => <TextField {...field}
			id="firstName"
			label={firstName}
			autoComplete="firstName"
			variant="outlined"
			size="small"
			disabled={busy}
		/>}
	/>
}
