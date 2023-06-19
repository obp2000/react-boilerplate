import type { Translation } from "@/app/i18n/dictionaries"
import type { SerializedOrderObject } from "@/interfaces/orders"
import { TextField } from '@mui/material'
import { Controller, type Control } from "react-hook-form"

export default function PostCost({
	control,
	labels: {
		postCost,
	},
	busy,
}: {
	control: Control<SerializedOrderObject, any>
	labels: Translation['order']
	busy: boolean
}) {
	return <Controller name="postCost"
		control={control}
		render={({ field: { value, ...field } }) => <TextField
			{...field}
			id="postCost"
			value={value || ''}
			label={postCost}
			type="number"
			variant="outlined"
			size="small"
			disabled={busy}
			// InputProps={unitsLabel('₽')}
			inputProps={{
				inputMode: 'decimal',
				step: '0.1',
			}}
		/>}
	/>
}
