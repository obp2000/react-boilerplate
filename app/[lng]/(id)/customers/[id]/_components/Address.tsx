import type { Translation } from "@/app/i18n/dictionaries"
import type { SerializedCustomerObject } from "@/interfaces/customers"
import { TextField } from '@mui/material'
import { Controller, type Control } from "react-hook-form"

export default function Address({
	control,
	labels: {
		address,
	},
	busy,
}: {
	control: Control<SerializedCustomerObject, any>
	labels: Translation['customer']
	busy: boolean
}) {
	return <Controller name="address"
		control={control}
		render={({ field }) => <TextField {...field}
			id="address"
			label={address}
			size="small"
			fullWidth
			disabled={busy}
		/>}
	/>
}
