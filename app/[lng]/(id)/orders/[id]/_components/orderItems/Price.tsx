import { unitsLabel } from "@/app/_objects/formHelpers"
import type { Translation } from "@/app/i18n/dictionaries"
import type { SerializedOrderObject } from "@/interfaces/orders"
import { TextField } from '@mui/material'
import { Controller, type Control } from "react-hook-form"

export default function Price({
	index,
	control,
	units: {
		meter_short: meterShort,
	},
	busy,
}: {
	index: number
	control: Control<SerializedOrderObject, any>
	units: Translation['units']
	busy: boolean
}) {
	return <Controller name={`orderItems.${index}.price`}
		control={control}
		render={({ field: { value, ...field } }) => <TextField {...field}
			id={`orderItems.${index}.price`}
			value={value || ''}
			type="number"
			size="small"
			disabled={busy}
			InputProps={unitsLabel(`₽/${meterShort}`)}
			inputProps={{
				inputMode: 'numeric',
				min: 0,
			}}
		/>}
	/>
}
