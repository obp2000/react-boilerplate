import type { Translation } from "@/app/i18n/dictionaries"
import type { SerializedOrderObject } from "@/interfaces/orders"
import {
	FormControl, InputLabel,
	MenuItem,
	Select
} from '@mui/material'
import { Controller, type Control } from "react-hook-form"

export default function DeliveryType({
	control,
	labels: {
		deliveryType,
		deliveryTypeChoices,
	},
	busy,
}: {
	control: Control<SerializedOrderObject, any>
	labels: Translation['order']
	busy: boolean
}) {
	return <Controller name="deliveryType"
		control={control}
		render={({ field: { value, ...field } }) => <FormControl
			size='small' fullWidth>
			<InputLabel id="deliveryType-label">
				{deliveryType}
			</InputLabel>
			<Select
				{...field}
				value={value || ''}
				labelId="deliveryType-label"
				id="deliveryType"
				label={deliveryType}
				disabled={busy}
			>
				<MenuItem value=""><em>------</em></MenuItem>
				{deliveryTypeChoices.map(
					({ value, display_name }) => <MenuItem
						key={value} value={value}>
						{display_name}
					</MenuItem>)}
			</Select>
		</FormControl>}
	/>
}
