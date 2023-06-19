import { unitsLabel } from '@/app/_objects/formHelpers'
import type { Translation } from "@/app/i18n/dictionaries"
import type { SerializedProductObject } from "@/interfaces/products"
import { TextField } from '@mui/material'
import { Controller, type Control } from "react-hook-form"

export default function DensityShop({
	control,
	labels: {
		densityShop,
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
	return <Controller name="densityShop"
		control={control}
		render={({ field: { value, ...field } }) => <TextField
			{...field}
			id="density_shop"
			value={value || ''}
			label={densityShop}
			type="number"
			size="small"
			disabled={busy}
			InputLabelProps={{ shrink: true }}
			InputProps={unitsLabel(`${gramShort}./${meterShort}2`)}
			inputProps={{
				inputMode: 'numeric',
			}}
		/>}
	/>
}
