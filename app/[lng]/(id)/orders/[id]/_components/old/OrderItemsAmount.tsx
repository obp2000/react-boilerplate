import type { Translation } from "@/app/i18n/dictionaries"
import type { SerializedOrderObject } from "@/interfaces/orders"
import type { UseFormWatch } from "react-hook-form"

export function orderItemsAmount(
	orderItems?: SerializedOrderObject['orderItems']) {
	return (orderItems || []).reduce((sum, { amount }) => 
		sum + Number(amount),
		0)
}

export default function OrderItemsAmount({
	watch,
	units: {
		meter_short: meterShort
	},
}: {
	watch: UseFormWatch<SerializedOrderObject>
	units: Translation['units']
}) {
	const [
		orderItems,
	] = watch([
		'orderItems',
	])
	return <>
		{orderItemsAmount(orderItems).toFixed(2)}{meterShort}
	</>
}
