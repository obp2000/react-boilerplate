import { unitsLabel } from '@/app/_objects/formHelpers'
import type { Translation } from "@/app/i18n/dictionaries"
import type { SerializedProductObject } from "@/interfaces/products"
import { TextField } from '@mui/material'
import { Controller, type Control } from "react-hook-form"

export default function PricePre({
	control,
	labels: {
		pricePre,
	},
	busy,
	units: {
		meter_short: meterShort,
	},
}: {
	control: Control<SerializedProductObject, any>
	labels: Translation['product']
	busy: boolean
	units: Translation['units']
}) {
	return <Controller name="pricePre"
		control={control}
		render={({ field: { value, ...field } }) => <TextField
			{...field}
			id="price_pre"
			value={value || ''}
			label={pricePre}
			type="number"
			size="small"
			disabled={busy}
			InputLabelProps={{ shrink: true }}
			InputProps={unitsLabel(`₽/${meterShort}`)}
			inputProps={{
				inputMode: 'numeric',
			}}
		/>}
	/>
}
