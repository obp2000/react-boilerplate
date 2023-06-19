import type { Translation } from "@/app/i18n/dictionaries"
import type { SerializedProductObject } from "@/interfaces/products"
import { FormControlLabel, Switch } from '@mui/material'
import { Controller, type Control } from "react-hook-form"

export default function Fleece({
	control,
	labels: {
		fleece,
	},
	busy,
	initialValues,
}: {
	control: Control<SerializedProductObject, any>
	labels: Translation['product']
	busy: boolean
	initialValues: SerializedProductObject
}) {
	return <Controller name="fleece"
		control={control}
		render={({ field: { value, ...field } }) => <FormControlLabel
			label={fleece}
			control={<Switch id='fleece'
				{...field}
				value={!!value}
				defaultChecked={!!initialValues.fleece}
				size='small'
				disabled={busy}
			/>}
		/>}
	/>
}
