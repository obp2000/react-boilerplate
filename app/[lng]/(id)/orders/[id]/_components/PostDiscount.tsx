import { TextField } from '@mui/material'

import { unitsLabel } from '@/app/_objects/formHelpers'
import { postCostWithPacket } from './PostCostWithPacket'
import consts from './consts.json'
import { orderItemsCost } from './OrderItemsTotals'

import type { SerializedOrderObject } from "@/interfaces/orders"
import type { UseFormWatch } from "react-hook-form"

export function postDiscount({
	orderItems,
	postCost,
	packet
}: {
	orderItems: SerializedOrderObject['orderItems']
	postCost: SerializedOrderObject['postCost']
	packet: SerializedOrderObject['packet']
}) {
	return orderItemsCost(orderItems) >= consts.SUM_FOR_POST_DISCOUNT
		? postCostWithPacket({ postCost, packet }) *
		consts.POST_DISCOUNT_PERCENT / 100
		: 0
}

export default function PostDiscount({
	watch,
	label,
}: {
	watch: UseFormWatch<SerializedOrderObject>
	label: string
}) {
	const [
		orderItems,
		postCost,
		packet
	] = watch([
		'orderItems',
		'postCost',
		'packet'
	])
	return <TextField
		label={label}
		size="small"
		value={postDiscount({ orderItems, postCost, packet }).toFixed(2)}
		disabled
		InputProps={unitsLabel('₽')}
	/>
}
