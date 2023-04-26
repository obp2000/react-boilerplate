import { unitsLabel } from '@/app/_objects/formHelpers'
import type { OrderItemProps, SerializedOrderObject } from '@/interfaces/orders'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import TextField from '@mui/material/TextField'
import {
    Controller
} from "react-hook-form"
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
	textDelete,
	notFound,
	remove,
	setValue,
}: OrderItemProps) {
	// console.log('product errors ', errors)
	// const [currentProduct, setCurrentProduct] = useState(product)
	return <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
		<TableCell component="th" scope="row">
			{index + 1}
		</TableCell>
		<TableCell>
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
		</TableCell>
		<TableCell align="right">
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
		</TableCell>
		<TableCell align="right">
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
		</TableCell>
		<TableCell align="right">
			{orderItemsValues ? cost(orderItemsValues[index]).toFixed(2) : 0}
		</TableCell>
		<TableCell align="right">
			{orderItemsValues ? weight(orderItemsValues[index]).toFixed(0) : 0}
		</TableCell>
		<TableCell>
			<DeleteButton {...{
				index,
				remove,
				label,
				okText,
				cancelText,
				busy,
			}} />
		</TableCell>
	</TableRow>
}
