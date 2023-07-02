import {
	inputDecimal,
	inputNumeric,
	unitsLabel
} from '@/app/_objects/formHelpers'
import type { Translation } from '@/app/i18n/dictionaries'
import type { SerializedOrderObject } from '@/interfaces/orders'
import { TextField } from '@mui/material'
import {
	Controller,
	type Control,
	type UseFieldArrayRemove,
	type UseFormRegister,
	type UseFormSetValue
} from 'react-hook-form'
import DeleteButton from './DeleteButton'
import renderProduct from './Product'

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

type Props = {
	index: number
	getProductOptionLabel:
	(product: SerializedOrderObject['orderItems'][number]['product']) => string
	control: Control<SerializedOrderObject, any>
	register: UseFormRegister<SerializedOrderObject>
	// errors: FieldErrors['root']
	errorMessages: Translation['errorMessages']
	// labels: Translation['order']
	units: Translation['units']
	busy: boolean
	orderItem: SerializedOrderObject['orderItems'][number]
	label: string
	okText: string
	cancelText: string
	textDelete: string
	notFound: string
	remove: UseFieldArrayRemove
	setValue: UseFormSetValue<SerializedOrderObject>
}

export default function OrderItemComp({
	index,
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
}: Props) {
	// console.log('orderItemsValues[index] ', orderItemsValues[index])
	// const [currentProduct, setCurrentProduct] = useState(product)
	return <tr className='border-b dark:border-neutral-500'>
		<td className='whitespace-nowrap px-6 py-4' scope='row'>
			{index + 1}
		</td>
		<td className='whitespace-nowrap px-6 py-4'>
			<Controller name={`orderItems.${index}.product`}
				control={control} 
				render={renderProduct({
					index,
					getOptionLabel: getProductOptionLabel,
					busy,
					errorMessages,
					setValue,
					notFound,
				})} />
		</td>
		<td className='whitespace-nowrap px-6 py-4' align="right">
			<TextField {...register(`orderItems.${index}.price`)}
				type="number"
				size="small"
				disabled={busy}
				InputProps={unitsLabel(`₽/${meterShort}`)}
				inputProps={inputNumeric}
			/>
		</td>
		<td className='whitespace-nowrap px-6 py-4' align="right">
			<TextField {...register(`orderItems.${index}.amount`)}
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
