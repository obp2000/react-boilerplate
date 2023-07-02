import type { Translation } from "@/app/i18n/dictionaries"
import type { SerializedOrderObject } from "@/interfaces/orders"
import { TextField } from "@mui/material"
import type { UseFormRegister, UseFormWatch } from "react-hook-form"
import consts from './consts.json'
import { cost, weight } from './orderItems/OrderItem'

export function orderItemsAmount(
	orderItems?: SerializedOrderObject['orderItems']) {
	return (orderItems || []).reduce((sum, { amount }) => 
		sum + Number(amount), 0)
}

export function orderItemsCost(
	orderItems?: SerializedOrderObject['orderItems']) {
	return (orderItems || []).reduce((sum, orderItem) => 
		sum + cost(orderItem), 0)
}

export function orderItemsWeight(
	orderItems?: SerializedOrderObject['orderItems']) {
	return (orderItems || []).reduce((sum, orderItem) =>
		sum + weight(orderItem), 0)
}

export default function OrderItemsTotals({
	register,
	labels: {
		orderItemsCost: orderItemsCostLabel,
		needGift,
		gift,
	},
	busy,
	watch,
	units: {
		meter_short: meterShort
	},
	giftNeeded,
}: {
	register: UseFormRegister<SerializedOrderObject>
	labels: Partial<Translation['order']>
	busy: boolean
	watch: UseFormWatch<SerializedOrderObject>
	units: Translation['units']
	giftNeeded: boolean
}) {
	const [
		orderItems,
	] = watch([
		'orderItems',
	])
	return <tr className='border-b dark:border-neutral-500'>
		<td className='whitespace-nowrap px-6 py-4'>
			{orderItemsCostLabel}
		</td>
		<td className='whitespace-nowrap px-6 py-4'>
			{giftNeeded && <TextField {...register('gift')}
				label={`${needGift}!`}
				size="small"
				disabled={busy}
			/>}
		</td>
		<td className='whitespace-nowrap px-6 py-4' />
		<td className='whitespace-nowrap px-6 py-4' align='center'>
			{orderItemsAmount(orderItems).toFixed(2)}{meterShort}
		</td>
		<td className='whitespace-nowrap px-6 py-4' align='right'>
			{orderItemsCost(orderItems).toFixed(2)}
		</td>
		<td className='whitespace-nowrap px-6 py-4' align='right'
			colSpan={giftNeeded ? 2 : 1}>
			{orderItemsWeight(orderItems).toFixed(0)}
			{giftNeeded && ` + ${consts.GIFT_WEIGHT}(${gift})`}
		</td>
	</tr>
}
