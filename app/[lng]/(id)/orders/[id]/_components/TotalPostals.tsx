import type { SerializedOrderObject } from "@/interfaces/orders"
import type { UseFormWatch } from "react-hook-form"
import { postCostWithPacket } from './PostCostWithPacket'
import { postDiscount } from './PostDiscount'

export function totalPostals(values: {
  orderItems: SerializedOrderObject['orderItems']
  postCost: SerializedOrderObject['postCost']
  packet: SerializedOrderObject['packet']
}) {
  return postCostWithPacket(values) - postDiscount(values)
}

export function TotalPostals({
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
		{totalPostals({ orderItems, postCost, packet }).toFixed(2)}
	</>
}
