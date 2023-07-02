import { unitsLabel } from '@/app/_objects/formHelpers'
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
	label,
}: {
	watch: UseFormWatch<SerializedOrderObject>
	label: string
}) {
  const [
    postCost,
    packet,
  ] = watch([
    'postCost',
    'packet'
  ])
	return <TextField
		label={label}
		size="small"
		value={postCostWithPacket({ postCost, packet })}
		disabled
		InputProps={unitsLabel('₽')}
	/>
}
