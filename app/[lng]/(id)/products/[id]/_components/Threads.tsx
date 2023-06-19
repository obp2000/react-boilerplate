import type { Translation } from "@/app/i18n/dictionaries"
import type { SerializedProductObject } from "@/interfaces/products"
import {
	FormControl, InputLabel,
	MenuItem,
	Select
} from '@mui/material'
import { Controller, type Control } from "react-hook-form"

export default function Threads({
	control,
	labels: {
		threads,
		threadsChoices,
	},
	busy,
}: {
	control: Control<SerializedProductObject, any>
	labels: Translation['product']
	busy: boolean
}) {
	return <Controller name="threads"
		control={control}
		render={({ field: { value, ...field } }) => <FormControl
			size='small' fullWidth>
			<InputLabel id="threads-label">
				{threads}
			</InputLabel>
			<Select
				{...field}
				value={value ?? ''}
				labelId="threads-label"
				id="threads"
				label={threads}
				disabled={busy}
			>
				<MenuItem value=''><em>------</em></MenuItem>
				{threadsChoices.map(
					({ value, display_name }) => <MenuItem
						key={value} value={value}>
						{display_name}
					</MenuItem>)}
			</Select>
		</FormControl>}
	/>
}
