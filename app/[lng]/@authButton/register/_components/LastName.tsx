import type { Translation } from "@/app/i18n/dictionaries"
import type { RegisterValues } from "@/interfaces/users"
import { TextField } from '@mui/material'
import type { UseFormRegister } from "react-hook-form"

export default function LastName({
	register,
	labels: {
		lastName,
	},
	busy,
}: {
	register: UseFormRegister<RegisterValues>
	labels: Partial<Translation['auth']>
	busy: boolean
}) {
	return <TextField {...register('lastName')}
		label={lastName}
		autoComplete="lastName"
		variant="outlined"
		size="small"
		disabled={busy}
	/>
}
