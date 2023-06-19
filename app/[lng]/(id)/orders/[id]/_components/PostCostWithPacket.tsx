import { unitsLabel } from '@/app/_objects/formHelpers'
import type { Translation } from "@/app/i18n/dictionaries"
import type { SerializedOrderObject } from "@/interfaces/orders"
import { TextField } from '@mui/material'
import type { UseFormWatch } from "react-hook-form"

export function postCostWithPacket({
	postCost,
	packet
}: {
	postCost: SerializedOrderObject['postCost']
	packet: SerializedOrderObject['packet']
}) {
	return Number(postCost) + Number(packet)
}

export default function PostCostWithPacket({
	watch,
	labels,
}: {
	watch: UseFormWatch<SerializedOrderObject>
	labels: Translation['order']
}) {
  const [
    postCost,
    packet,
  ] = watch([
    'postCost',
    'packet'
  ])
	return <TextField
		label={labels.postCostWithPacket}
		size="small"
		value={postCostWithPacket({ postCost, packet })}
		disabled
		InputProps={unitsLabel('₽')}
	/>
}
