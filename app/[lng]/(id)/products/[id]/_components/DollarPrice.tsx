import { unitsLabel } from '@/app/_objects/formHelpers'
import type { Translation } from "@/app/i18n/dictionaries"
import type { SerializedProductObject } from "@/interfaces/products"
import { TextField } from '@mui/material'
import { Controller, type Control } from "react-hook-form"

export default function DollarPrice({
	control,
	labels: {
		dollarPrice,
	},
	busy,
	units: {
		kilogram_short: kilogramShort
	},
}: {
	control: Control<SerializedProductObject, any>
	labels: Translation['product']
	busy: boolean
	units: Translation['units']
}) {
	return <Controller name="dollarPrice"
		control={control}
		render={({ field: { value, ...field } }) => <TextField
		{...field}
			type='number'
			id="dollar_price"
			value={value || ''}
			label={dollarPrice}
			size="small"
			disabled={busy}
			InputProps={unitsLabel(`$/${kilogramShort}`)}
			inputProps={{
				inputMode: 'decimal',
				step: '0.1',
			}}
		/>}
	/>
}
