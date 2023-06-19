import type { Translation } from "@/app/i18n/dictionaries"
import type { SerializedCustomerObject } from "@/interfaces/customers"
import { TextField } from '@mui/material'
import { Controller, type Control } from "react-hook-form"

export default function Name({
	control,
	labels: {
		name,
	},
	busy,
}: {
	control: Control<SerializedCustomerObject, any>
	labels: Translation['customer']
	busy: boolean
}) {
	return <Controller name="name"
		control={control}
		render={({ field }) => <TextField {...field}
			id="name"
			label={name}
			size="small"
			fullWidth
			disabled={busy}
		/>}
	/>
}
