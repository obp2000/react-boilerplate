import { unitsLabel } from '@/app/_objects/formHelpers'
import type { Translation } from "@/app/i18n/dictionaries"
import type { SerializedProductObject } from "@/interfaces/products"
import { TextField } from '@mui/material'
import { Controller, type Control } from "react-hook-form"

export default function Density({
	control,
	labels: {
		density,
	},
	busy,
	units: {
		gram_short: gramShort,
		meter_short: meterShort,
	},
}: {
	control: Control<SerializedProductObject, any>
	labels: Translation['product']
	busy: boolean
	units: Translation['units']
}) {
	return <Controller name="density"
		control={control}
		render={({ field: { value, ...field } }) => <TextField {...field}
			type='number'
			id="density"
			value={value || ''}
			label={density}
			size="small"
			disabled={busy}
			InputProps={unitsLabel(`${gramShort}./${meterShort}2`)}
			inputProps={{
				inputMode: 'numeric',
			}}
		/>}
	/>
}
