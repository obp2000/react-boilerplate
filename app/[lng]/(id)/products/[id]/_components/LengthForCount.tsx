import { unitsLabel } from '@/app/_objects/formHelpers'
import type { Translation } from "@/app/i18n/dictionaries"
import type { SerializedProductObject } from "@/interfaces/products"
import { TextField } from '@mui/material'
import { Controller, type Control } from "react-hook-form"

export default function LengthForCount({
	control,
	labels: {
		lengthForCount,
	},
	busy,
	units: {
		meter_short: meterShort
	},
}: {
	control: Control<SerializedProductObject, any>
	labels: Translation['product']
	busy: boolean
	units: Translation['units']
}) {
	return <Controller name="lengthForCount"
		control={control}
		render={({ field: { value, ...field } }) => <TextField
			{...field}
			id="length_for_count"
			value={value || ''}
			label={lengthForCount}
			type="number"
			size="small"
			disabled={busy}
			InputProps={unitsLabel(meterShort)}
			inputProps={{
				inputMode: 'decimal',
				step: '0.1'
			}}
		/>}
	/>
}
