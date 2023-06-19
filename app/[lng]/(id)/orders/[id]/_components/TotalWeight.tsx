import type { SerializedOrderObject } from "@/interfaces/orders"
import type { UseFormWatch } from "react-hook-form"
import consts from './consts.json'
import { orderItemsWeight } from "./OrderItemsWeight"

export function totalWeight(
	giftNeeded: boolean,
	orderItems?: SerializedOrderObject['orderItems'],
) {
	return orderItemsWeight(orderItems) +
		consts.SAMPLES_WEIGHT +
		consts.PACKET_WEIGHT +
		(giftNeeded ? consts.GIFT_WEIGHT : 0)
}

export default function TotalWeight({
	watch,
	giftNeeded,
}: {
	watch: UseFormWatch<SerializedOrderObject>
	giftNeeded: boolean
}) {
	const [
		orderItems,
	] = watch([
		'orderItems',
	])
	return <>
		{totalWeight(giftNeeded, orderItems).toFixed(0)}
	</>
}
