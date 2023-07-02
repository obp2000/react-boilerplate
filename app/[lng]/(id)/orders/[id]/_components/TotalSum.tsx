import type { SerializedOrderObject } from "@/interfaces/orders"
import type { UseFormWatch } from "react-hook-form"
import { orderItemsCost } from "./OrderItemsTotals"
import { totalPostals } from "./TotalPostals"

export function totalSum({
	orderItems,
	postCost,
	packet
}: {
	orderItems: SerializedOrderObject['orderItems']
	postCost: SerializedOrderObject['postCost']
	packet: SerializedOrderObject['packet']
}) {
	return orderItemsCost(orderItems) +
		totalPostals({ orderItems, postCost, packet })
}

export default function TotalSum({
	watch,
}: {
	watch: UseFormWatch<SerializedOrderObject>
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
	return <>
		{totalSum({ orderItems, postCost, packet }).toFixed(2)}
	</>
}
