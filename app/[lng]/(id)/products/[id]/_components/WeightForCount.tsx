import { unitsLabel } from '@/app/_objects/formHelpers'
import type { Translation } from "@/app/i18n/dictionaries"
import type { SerializedProductObject } from "@/interfaces/products"
import { TextField } from '@mui/material'
import { Controller, type Control } from "react-hook-form"

export default function WeightForCount({
	control,
	labels: {
		weightForCount,
	},
	busy,
	units: {
		gram_short: gramShort
	},
}: {
	control: Control<SerializedProductObject, any>
	labels: Translation['product']
	busy: boolean
	units: Translation['units']
}) {
	return <Controller name="weightForCount"
		control={control}
		render={({ field: { value, ...field } }) => <TextField {...field}
			id="weight_for_count"
			value={value || ''}
			label={weightForCount}
			type="number"
			size="small"
			disabled={busy}
			InputProps={unitsLabel(gramShort)}
			inputProps={{
				inputMode: 'numeric',
			}}
		/>}
	/>
}
