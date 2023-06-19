import type { SerializedOrderObject } from "@/interfaces/orders"
import type { UseFormWatch } from "react-hook-form"
import { cost } from './orderItems/Cost'

export function orderItemsCost(orderItems?:
	SerializedOrderObject['orderItems']) {
	return (orderItems || []).reduce((sum, orderItem) => 
		sum + cost(orderItem),
		0)
}

export default function OrderItemsCost({
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
		{orderItemsCost(orderItems).toFixed(2)}
	</>
}
