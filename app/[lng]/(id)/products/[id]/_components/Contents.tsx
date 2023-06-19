import type { Translation } from "@/app/i18n/dictionaries"
import type { SerializedProductObject } from "@/interfaces/products"
import {
	FormControl, InputLabel,
	MenuItem,
	Select
} from '@mui/material'
import { Controller, type Control } from "react-hook-form"

export default function Contents({
	control,
	labels: {
		contents,
		contentsChoices,
	},
	busy,
}: {
	control: Control<SerializedProductObject, any>
	labels: Translation['product']
	busy: boolean
}) {
	return <Controller name="contents"
		control={control}
		render={({ field: { value, ...field } }) => <FormControl
			size='small'	
			fullWidth>
			<InputLabel id="contents-label">
				{contents}
			</InputLabel>
			<Select
				{...field}
				value={value ?? ''}
				labelId="contents-label"
				id="contents"
				label={contents}
				// displayEmpty
				disabled={busy}
			>
				<MenuItem value=""><em>------</em></MenuItem>
				{contentsChoices.map(
					({ value, display_name }) => <MenuItem
						key={value}
						value={value}>
						{display_name}
					</MenuItem>)}
			</Select>
		</FormControl>}
	/>
}
