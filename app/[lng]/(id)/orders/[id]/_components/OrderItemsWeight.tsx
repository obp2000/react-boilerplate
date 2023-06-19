import type { SerializedOrderObject } from "@/interfaces/orders"
import type { UseFormWatch } from "react-hook-form"
import { weight } from './orderItems/Weight'

export function orderItemsWeight(orderItems?:
	SerializedOrderObject['orderItems']) {
	return (orderItems || []).reduce((sum, orderItem) =>
		sum + weight(orderItem),
		0)
}

export default function OrderItemsWeight({
	watch,
}: {
	watch: UseFormWatch<SerializedOrderObject>
}) {
	const [
		orderItems,
	] = watch([
		'orderItems',
	])
	return <>
		{orderItemsWeight(orderItems).toFixed(0)}
	</>
}
