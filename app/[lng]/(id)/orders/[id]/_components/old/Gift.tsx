import type { SerializedOrderObject } from "@/interfaces/orders"
import { TextField } from '@mui/material'
import type { UseFormRegister } from "react-hook-form"

export default function Gift({
	register,
	label,
	busy,
	giftNeeded,
}: {
	register: UseFormRegister<SerializedOrderObject>
	label: string
	busy: boolean
	giftNeeded: boolean
}) {
	if (!giftNeeded) { return null }
	return <TextField {...register('gift')}
			label={`${label}!`}
			size="small"
			// fullWidth
			disabled={busy}
	/>
}
