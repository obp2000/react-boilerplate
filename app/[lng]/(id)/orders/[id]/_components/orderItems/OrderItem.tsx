import type { OrderItemProps } from '@/interfaces/orders'
import Amount from './Amount'
import DeleteButton from './DeleteButton'
import Price from './Price'
import ProductField from './ProductField'
import Cost from './Cost'
import Weight from './Weight'

export default function OrderItemComp({
	index,
	getProductOptionLabel,
	control,
	errors,
	errorMessages,
	labels,
	units,
	busy,
	initOrderItem,
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
			<ProductField {...{
				index,
				initialValues: initOrderItem,
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
			<Price {...{ index, control, units, busy }} />
		</td>
		<td className='whitespace-nowrap px-6 py-4' align="right">
			<Amount {...{ index, control, units, busy }} />
		</td>
		<td className='whitespace-nowrap px-6 py-4' align="right">
			<Cost {...{ orderItem }} />
		</td>
		<td className='whitespace-nowrap px-6 py-4' align="right">
			<Weight {...{ orderItem }} />
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
