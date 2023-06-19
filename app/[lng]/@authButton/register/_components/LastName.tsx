import type { Translation } from "@/app/i18n/dictionaries"
import type { RegisterValues } from "@/interfaces/users"
import { TextField } from '@mui/material'
import {
	Controller,
	type Control
} from "react-hook-form"

export default function LastName({
	control,
	labels: {
		lastName,
	},
	busy,
}: {
	control: Control<RegisterValues, any>
	labels: Translation['auth']
	busy: boolean
}) {
	return <Controller name="lastName"
		control={control}
		render={({ field }) => <TextField {...field}
			id="lastName"
			label={lastName}
			autoComplete="lastName"
			variant="outlined"
			size="small"
			disabled={busy}
		/>}
	/>
}
