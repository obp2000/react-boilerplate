import type { Translation } from "@/app/i18n/dictionaries"
import type { SerializedOrderObject } from "@/interfaces/orders"
import type { Control, UseFormWatch } from "react-hook-form"
import Gift from "./Gift"
import GiftWeight from "./GiftWeight"
import OrderItemsAmount from "./OrderItemsAmount"
import OrderItemsCost from "./OrderItemsCost"
import OrderItemsWeight from "./OrderItemsWeight"

export default function OrderItemsTotals({
	control,
	labels,
	busy,
	watch,
	units,
	giftNeeded,
}: {
	control: Control<SerializedOrderObject, any>
	labels: Translation['order']
	busy: boolean
	watch: UseFormWatch<SerializedOrderObject>
	units: Translation['units']
	giftNeeded: boolean
}) {
	return <tr className='border-b dark:border-neutral-500'>
		<td className='whitespace-nowrap px-6 py-4'>
			{labels.orderItemsCost}
		</td>
		<td className='whitespace-nowrap px-6 py-4'>
			<Gift {...{ control, labels, busy, giftNeeded }} />
		</td>
		<td className='whitespace-nowrap px-6 py-4' />
		<td className='whitespace-nowrap px-6 py-4' align='center'>
			<OrderItemsAmount {...{ watch, units }} />
		</td>
		<td className='whitespace-nowrap px-6 py-4' align='right'>
			<OrderItemsCost {...{ watch }} />
		</td>
		<td className='whitespace-nowrap px-6 py-4' align='right'
			colSpan={giftNeeded ? 2 : 1}>
			<OrderItemsWeight {...{ watch }} />
			<GiftWeight {...{ labels, giftNeeded }} />
		</td>
	</tr>
}
