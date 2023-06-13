import { unitsLabel } from '@/app/_objects/formHelpers'
import type { OrderItemProps, SerializedOrderObject } from '@/interfaces/orders'
import { TextField } from '@mui/material'
import { Controller } from "react-hook-form"
import DeleteButton from './DeleteButton'
import ProductField from './ProductField'

export function cost({ amount, price }: SerializedOrderObject['orderItems'][number]) {
	return amount && price ? Number(amount) * Number(price) : 0
}

export function weight({ amount, product }: SerializedOrderObject['orderItems'][number]) {
	return amount && product && product.density && product.width
		? Number(amount) * Number(product.density) * Number(product.width) / 100
		: 0
}

export default function OrderItemComp({
	index,
	product,
	getProductOptionLabel,
	control,
	errors,
	errorMessages,
	labels,
	units,
	busy,
	orderItemsValues,
	label,
	okText,
	cancelText,
	notFound,
	remove,
	setValue,
}: OrderItemProps) {
	// console.log('product errors ', errors)
	// const [currentProduct, setCurrentProduct] = useState(product)
	return <tr className='border-b dark:border-neutral-500'>
		<td className='whitespace-nowrap px-6 py-4' scope='row'>
			{index + 1}
		</td>
		<td className='whitespace-nowrap px-6 py-4'>
			<ProductField {...{
				index,
				product,
				label: labels.orderItem.product,
				getProductOptionLabel,
				busy,
				errors,
				errorMessages,
				setValue,
				notFound,
				control,
			}} />
		</td>
		<td className='whitespace-nowrap px-6 py-4' align="right">
			<Controller name={`orderItems.${index}.price`}
				control={control}
				render={({ field: { value, ...field } }) => <TextField {...field}
					id={`orderItems.${index}.price`}
					value={value || ''}
					type="number"
					size="small"
					disabled={busy}
					InputProps={unitsLabel(`₽/${units.meter_short}`)}
					inputProps={{
						inputMode: 'numeric',
						min: 0,
					}}
				/>}
			/>
		</td>
		<td className='whitespace-nowrap px-6 py-4' align="right">
			<Controller name={`orderItems.${index}.amount`}
				control={control}
				render={({ field: { value, ...field } }) => <TextField {...field}
					id={`orderItems.${index}.amount`}
					value={value || ''}
					type="number"
					size="small"
					disabled={busy}
					InputProps={unitsLabel(units.meter_short)}
					inputProps={{
						inputMode: 'decimal',
						step: '0.1',
						min: 0,
					}}
				/>}
			/>
		</td>
		<td className='whitespace-nowrap px-6 py-4' align="right">
			{orderItemsValues ? cost(orderItemsValues[index]).toFixed(2) : 0}
		</td>
		<td className='whitespace-nowrap px-6 py-4' align="right">
			{orderItemsValues ? weight(orderItemsValues[index]).toFixed(0) : 0}
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
