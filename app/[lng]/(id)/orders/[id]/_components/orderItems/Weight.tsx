import type { SerializedOrderObject } from "@/interfaces/orders"

export function weight({ amount, product }:
	SerializedOrderObject['orderItems'][number]) {
	return amount && product &&
		product.density && product.width
		? Number(amount) * Number(product.density) *
		Number(product.width) / 100
		: 0
}

export default function Weight({
	orderItem,
}: {
	orderItem: SerializedOrderObject['orderItems'][number]
}) {
	return <>
		{weight(orderItem).toFixed(0)}
	</>
}
