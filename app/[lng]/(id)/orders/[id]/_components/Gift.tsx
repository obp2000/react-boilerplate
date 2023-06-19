import type { Translation } from "@/app/i18n/dictionaries"
import type { SerializedOrderObject } from "@/interfaces/orders"
import { TextField } from '@mui/material'
import { Controller, type Control } from "react-hook-form"

export default function Gift({
	control,
	labels: {
		needGift
	},
	busy,
	giftNeeded,
}: {
	control: Control<SerializedOrderObject, any>
	labels: Translation['order']
	busy: boolean
	giftNeeded: boolean
}) {
	if (!giftNeeded) { return null }
	return <Controller name="gift"
		control={control}
		render={({ field }) => <TextField {...field}
			id="gift"
			label={`${needGift}!`}
			size="small"
			fullWidth
			disabled={busy}
		/>}
	/>
}
