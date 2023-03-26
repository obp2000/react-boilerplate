import type { Translation } from '@/app/i18n/dictionaries'
import Tooltip from '@/app/useClient/Tooltip'
import type { OrderObject as Order } from '@/interfaces/orders'
import DeleteIcon from '@mui/icons-material/Delete'
import IconButton from '@mui/material/IconButton'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import TextField from '@mui/material/TextField'
import {
	Controller, type Control, type FieldErrors, type UseFieldArrayRemove,
	type UseFormSetValue
} from "react-hook-form"
import { deleteOrderItem } from './helpers'
import ProductField from './ProductField'
import { unitsLabel } from '@/app/form/helpers'

export function cost({ amount, price }: Order['orderItems'][number]) {
  return amount && price ? Number(amount) * Number(price) : 0
}

export function weight({ amount, product }: Order['orderItems'][number]) {
  return amount && product && product.density && product.width
    ? Number(amount) * Number(product.density) * Number(product.width) / 100
    : 0
}

type OrderItemProps = {
	index: number
	product: Order['orderItems'][number]['product']
	getProductOptionLabel: (product: Order['orderItems'][number]['product']) => string
	control: Control<Order>
	errors: FieldErrors<Order>
	errorMessages: Translation['errorMessages']
	labels: Translation['order']
	units: Translation['units']
	busy: boolean
	orderItemsValues: Order['orderItems']
	label: string
	okText: string
	cancelText: string
	textDelete: string
	notFound: string
	remove: UseFieldArrayRemove
	setValue: UseFormSetValue<Order>
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
			<Tooltip title={textDelete}>
				<IconButton disabled={busy} onClick={deleteOrderItem({
					index,
					remove,
					label,
					okText,
					cancelText,
				})}>
					<DeleteIcon />
				</IconButton>
			</Tooltip>
		</TableCell>
	</TableRow>
}


// {/*			<Controller name={`orderItems.${index}.product`}
// 				control={control}
// 				render={({ field: { ref, onChange, ...field } }) => <Autocomplete {...field}
// 					onChange={(_, data) => {
// 						if (data) {
// 							setValue(`orderItems.${index}.price`, data.price)
// 						}
// 						onChange(data)
// 					}}
// 					id={`orderItems.${index}.product`}
// 					size='small'
// 					isOptionEqualToValue={(option, value) => option.id === value.id}
// 					getOptionLabel={getProductOptionLabel}
// 					renderOption={(props, product) => <li {...props} key={product?.id || -1}>
// 						{getProductOptionLabel(product)}
// 					</li>}
// 					options={products}
// 					// filterOptions={(x) => x}
// 					onInputChange={onSearch('/products/', setProducts, setLoading)}
// 					noOptionsText={notFound}
// 					renderInput={(params) => <TextField
// 						{...params}
// 						{...field}
// 						inputRef={ref}
// 						label={labels.orderItem.product}
// 						disabled={busy}
// 						error={!!productError}
// 						// error={!!errors.taskChecks?.[i].name}
// 						helperText={productError
// 							? errorMessages[productError.message as keyof Translation['errorMessages']]
// 							: undefined}
// 						InputProps={{
// 							...params.InputProps,
// 							endAdornment: <>
// 								{loading ? <CircularProgress color="inherit" size={15} /> : null}
// 								{params.InputProps.endAdornment}
// 							</>,
// 						}}
// 					/>}
// 				/>}
// 			/>*/}
