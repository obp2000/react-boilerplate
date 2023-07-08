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

export default function OrderItemComp({
	index,
	initOrderItem,
	getProductOptionLabel,
	control,
	register,
	errorMessages,
	units: {
		meter_short: meterShort
	},
	busy,
	orderItem,
	label,
	okText,
	cancelText,
	notFound,
	remove,
	setValue,
}: OrderItemProps) {
	// console.log('orderItemsValues[index] ', orderItemsValues[index])
	// const [currentProduct, setCurrentProduct] = useState(product)
	return <tr className='border-b dark:border-neutral-500'>
		<td className='whitespace-nowrap px-6 py-4' scope='row'>
			{index + 1}
		</td>
		<td className='whitespace-nowrap px-6 py-4'>
			<Autocomplete 
				{...{
					name: `orderItems.${index}.product`,
					control,
					searchPath: '/products',
					init: initOrderItem?.product,
					getOptionLabel: getProductOptionLabel,
					busy,
					errorMessages,
					notFound,
					onChangeAction: (newValue: Product) =>
						setValue(`orderItems.${index}.price`, newValue?.price || 0),
					register,
					setValue,
				}} />
		</td>
		<td className='whitespace-nowrap px-6 py-4' align="right">
			<TextField {...register(`orderItems.${index}.price`,
				{ setValueAs: integerValue })}
				type="number"
				size="small"
				disabled={busy}
				InputProps={unitsLabel(`₽/${meterShort}`)}
				inputProps={inputNumeric}
			/>
		</td>
		<td className='whitespace-nowrap px-6 py-4' align="right">
			<TextField {...register(`orderItems.${index}.amount`),
				{ setValueAs: floatValue }}
				type="number"
				size="small"
				disabled={busy}
				InputProps={unitsLabel(meterShort)}
				inputProps={inputDecimal}
			/>
		</td>
		<td className='whitespace-nowrap px-6 py-4' align="right">
			{cost(orderItem).toFixed(2)}
		</td>
		<td className='whitespace-nowrap px-6 py-4' align="right">
			{weight(orderItem).toFixed(0)}
		</td>
		<td className='whitespace-nowrap px-6 py-4'>
			<DeleteButton {...{
				index,
				remove,
				label,
				okText,
				cancelText,
				busy,
			}} />
		</td>
	</tr>
}
