import type { SerializedOrderObject } from "@/interfaces/orders"

export function cost({ amount, price }:
	SerializedOrderObject['orderItems'][number]) {
	return amount && price
		? Number(amount) * Number(price)
		: 0
}

export default function Cost({
	orderItem,
}: {
	orderItem: SerializedOrderObject['orderItems'][number]
}) {
	return <>
		{cost(orderItem).toFixed(2)}
	</>
}
