import type { Translation } from "@/app/i18n/dictionaries"
import type { SerializedOrderObject } from "@/interfaces/orders"
import { TextField } from '@mui/material'
import type { UseFormRegister } from "react-hook-form"

export default function PostCost({
	register,
	labels: {
		postCost,
	},
	busy,
}: {
	register: UseFormRegister<SerializedOrderObject>
	labels: Translation['order']
	busy: boolean
}) {
	return <TextField
			{...register('postCost')}
			// id="postCost"
			// value={value || ''}
			label={postCost}
			type="number"
			variant="outlined"
			size="small"
			disabled={busy}
			inputProps={{
				inputMode: 'decimal',
				step: '0.1',
			}}
	/>
}
