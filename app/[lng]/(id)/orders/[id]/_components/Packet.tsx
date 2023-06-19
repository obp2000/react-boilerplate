import type { Translation } from "@/app/i18n/dictionaries"
import type { SerializedOrderObject } from "@/interfaces/orders"
import {
	FormControl, InputLabel,
	MenuItem,
	Select
} from '@mui/material'
import { Controller, type Control } from "react-hook-form"

export default function Packet({
	control,
	labels: {
		packet,
		packetChoices,
	},
	busy,
}: {
	control: Control<SerializedOrderObject, any>
	labels: Translation['order']
	busy: boolean
}) {
	return <Controller name="packet"
		control={control}
		render={({ field: { value, ...field } }) => <FormControl
			size='small'
			fullWidth>
			<InputLabel id="packet-label">{packet}</InputLabel>
			<Select
				{...field}
				value={value || ''}
				labelId="packet-label"
				id="packet"
				label={packet}
				disabled={busy}
			>
				<MenuItem value=""><em>------</em></MenuItem>
				{packetChoices.map(
					({ value, display_name }) => <MenuItem
						key={value}
						value={value}>
						{display_name}
					</MenuItem>)}
			</Select>
		</FormControl>}
	/>
}
