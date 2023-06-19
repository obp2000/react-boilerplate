import { unitsLabel } from '@/app/_objects/formHelpers'
import type { Translation } from "@/app/i18n/dictionaries"
import type { SerializedProductObject } from "@/interfaces/products"
import { TextField } from '@mui/material'
import { Controller, type Control } from "react-hook-form"

export default function WidthShop({
	control,
	labels: {
		widthShop,
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
	return <Controller name="widthShop"
		control={control}
		render={({ field: { value, ...field } }) => <TextField
			{...field}
			id="width_shop"
			value={value || ''}
			label={widthShop}
			type="number"
			size="small"
			disabled={busy}
			InputLabelProps={{ shrink: true }}
			InputProps={unitsLabel(centimeterShort)}
			inputProps={{
				inputMode: 'numeric',
			}}
		/>}
	/>
}
