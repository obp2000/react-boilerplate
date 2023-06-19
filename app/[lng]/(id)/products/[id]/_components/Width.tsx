import { unitsLabel } from '@/app/_objects/formHelpers'
import type { Translation } from "@/app/i18n/dictionaries"
import type { SerializedProductObject } from "@/interfaces/products"
import { TextField } from '@mui/material'
import { Controller, type Control } from "react-hook-form"

export default function Width({
	control,
	labels: {
		width,
	},
	busy,
	units: {
		centimeter_short: centimeterShort
	},
}: {
	control: Control<SerializedProductObject, any>
	labels: Translation['product']
	busy: boolean
	units: Translation['units']
}) {
	return <Controller name="width"
		control={control}
		render={({ field: { value, ...field } }) => <TextField {...field}
			type='number'
			id="width"
			value={value || ''}
			label={width}
			size="small"
			disabled={busy}
			InputProps={unitsLabel(centimeterShort)}
			inputProps={{
				inputMode: 'numeric',
			}}
		/>}
	/>
}
