import { unitsLabel } from '@/app/_objects/formHelpers'
import type { Translation } from "@/app/i18n/dictionaries"
import type { SerializedProductObject } from "@/interfaces/products"
import { TextField } from '@mui/material'
import { Controller, type Control } from "react-hook-form"

export default function DollarRate({
	control,
	labels: {
		dollarRate,
	},
	busy,
}: {
	control: Control<SerializedProductObject, any>
	labels: Translation['product']
	busy: boolean
}) {
	return <Controller name="dollarRate"
		control={control}
		render={({ field: { value, ...field } }) => <TextField
			{...field}
			type='number'
			id="dollar_rate"
			value={value || ''}
			label={dollarRate}
			size="small"
			disabled={busy}
			InputProps={unitsLabel('₽/$')}
			inputProps={{
				inputMode: 'decimal',
				step: '0.1',
			}}
		/>}
	/>
}
