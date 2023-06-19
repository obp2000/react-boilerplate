import type { Translation } from "@/app/i18n/dictionaries"
import type { SerializedOrderObject } from "@/interfaces/orders"
import { TextField } from '@mui/material'
import { Controller, type Control } from "react-hook-form"

export default function Address({
	control,
	labels: {
		address,
	},
	busy,
}: {
	control: Control<SerializedOrderObject, any>
	labels: Translation['order']
	busy: boolean
}) {
	return <Controller name="address"
		control={control}
		render={({ field }) => <TextField {...field}
			id="address"
			className='col-span-2'
			label={address}
			size="small"
			fullWidth
			disabled={busy}
		/>}
	/>
}
