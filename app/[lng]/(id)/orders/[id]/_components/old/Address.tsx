import type { Translation } from "@/app/i18n/dictionaries"
import type { SerializedOrderObject } from "@/interfaces/orders"
import { TextField } from '@mui/material'
import type { UseFormRegister } from "react-hook-form"

export default function Address({
	register,
	labels: {
		address,
	},
	busy,
}: {
	register: UseFormRegister<SerializedOrderObject>
	labels: Translation['order']
	busy: boolean
}) {
	return <TextField {...register('address')}
		// id="address"
		className='col-span-2'
		label={address}
		size="small"
		// fullWidth
		disabled={busy}
	/>
}
