import { TextField } from '@mui/material'

import {
	floatValue,
	inputDecimal,
	inputNumeric,
	integerValue,
	unitsLabel
} from '@/app/_objects/formHelpers'
import DeleteButton from './DeleteButton'
import Autocomplete from '@/app/_objects/Autocomplete'

import type {
	OrderItemProps,
	SerializedOrderObject
} from '@/interfaces/orders'
import type { Product } from '@/interfaces/products'

export function cost({ amount, price }:
	SerializedOrderObject['orderItems'][number]) {
	return amount && price
		? Number(amount) * Number(price)
		: 0
}

export function weight({ amount, product }:
	SerializedOrderObject['orderItems'][number]) {
	return amount && product &&
		product.density && product.width
		? Number(amount) * Number(product.density) *
		Number(product.width) / 100
		: 0
}

export default function OrderItemComp(props: OrderItemProps) {
	return <tr className='border-b dark:border-neutral-500'>
		<td className='whitespace-nowrap px-6 py-4' scope='row'>
			{props.index + 1}
		</td>
		<td className='whitespace-nowrap px-6 py-4'>
			<Autocomplete 
				{...{
					name: `orderItems.${props.index}.product`,
					control: props.control,
					table: 'products',
					// init: props.initOrderItem?.product,
					getOptionLabel: props.getProductOptionLabel,
					busy: props.busy,
					errorMessages: props.errorMessages,
					notFound: props.notFound,
					onChangeAction: (newValue: Product) =>
						props.setValue(`orderItems.${props.index}.price`,
							newValue?.price || 0),
					register: props.register,
					setValue: props.setValue,
				}} />
		</td>
		<td className='whitespace-nowrap px-6 py-4' align="right">
			<TextField {...props.register(`orderItems.${props.index}.price`,
				{ setValueAs: integerValue })}
				type="number"
				size="small"
				disabled={props.busy}
				InputProps={unitsLabel(`₽/${props.units.meter_short}`)}
				inputProps={inputNumeric}
			/>
		</td>
		<td className='whitespace-nowrap px-6 py-4' align="right">
			<TextField {...props.register(`orderItems.${props.index}.amount`,
				{ setValueAs: floatValue })}
				type="number"
				size="small"
				disabled={props.busy}
				InputProps={unitsLabel(props.units.meter_short)}
				inputProps={inputDecimal}
			/>
		</td>
		<td className='whitespace-nowrap px-6 py-4' align="right">
			{cost(props.orderItem).toFixed(2)}
		</td>
		<td className='whitespace-nowrap px-6 py-4' align="right">
			{weight(props.orderItem).toFixed(0)}
		</td>
		<td className='whitespace-nowrap px-6 py-4'>
			<DeleteButton {...{
				index: props.index,
				remove: props.remove,
				label: props.label,
				okText: props.okText,
				cancelText: props.cancelText,
				busy: props.busy,
			}} />
		</td>
	</tr>
}
