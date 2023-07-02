import type { Translation } from "@/app/i18n/dictionaries"
import { ProductTypeType } from "@/interfaces/productTypes"
import type { SerializedProductObject } from "@/interfaces/products"
import {
	FormControl,
	InputLabel,
	MenuItem,
	Select
} from '@mui/material'
import {
	type Control,
	Controller,
	type ControllerRenderProps,
} from "react-hook-form"
import threadsChoices from '@/app/product/threads.json'
import contentsChoices from '@/app/product/contents.json'
import type { SerializedOrderObject } from "@/interfaces/orders"
import deliveryTypeChoices from '@/app/order/deliveryType.json'
import packetChoices from '@/app/order/packet.json'

type Field = ControllerRenderProps<SerializedProductObject,
	'productTypeId' | 'threads' | 'contents'> |
	ControllerRenderProps<SerializedOrderObject, 'deliveryType' | 'packet'> 
// type Choices = ProductTypeType[] | typeof threadsChoices |
// 	typeof contentsChoices | typeof deliveryTypeChoices |
// 	typeof packetChoices
// type ChoiceLabels = Translation['product']['threadsLabels' | 'contentsLabels'] |
// 	Translation['order']['deliveryTypeLabels' | 'packetLabels']

function renderSelect({
	name,
	label,
	choices,
	busy,
	choiceLabels,
}: Omit<ProductProps, 'control'> | Omit<OrderProps, 'control'>) {
	return ({ field: { value, ...field } }: { field: Field }) => <Select
		{...field}
		value={value ?? ''}
		id={name}
		label={label}
		disabled={busy}
	>
		<MenuItem value=''><em>------</em></MenuItem>
		{choices.map(
			({ id, name }) => <MenuItem
				key={id}
				value={id}>
				{choiceLabels ? choiceLabels[name as keyof typeof choiceLabels] : name}
			</MenuItem>)}
	</Select>
}

// type ControlType = Control<SerializedProductObject, 'productTypeId' | 'threads' | 'contents'> |
// 	Control<SerializedOrderObject, 'deliveryType' | 'packet'>

type ProductProps = {
	name: 'productTypeId' | 'threads' | 'contents'
	control: Control<SerializedProductObject, 'productTypeId' | 'threads' | 'contents'>
	label: string
	choices: ProductTypeType[] | typeof threadsChoices | typeof contentsChoices
	busy: boolean
	choiceLabels?: Translation['product']['threadsLabels' | 'contentsLabels']
}

type OrderProps = {
	name: 'deliveryType' | 'packet'
	control: Control<SerializedOrderObject, 'deliveryType' | 'packet'>
	label: string
	choices: typeof deliveryTypeChoices | typeof packetChoices
	busy: boolean
	choiceLabels?: Translation['order']['deliveryTypeLabels' | 'packetLabels']
}

export default function SelectComp(props: ProductProps): JSX.Element
export default function SelectComp(props: OrderProps ): JSX.Element
export default function SelectComp({
	name,
	control,
	label,
	choices,
	busy,
	choiceLabels,
}: {
	name: any
	control: any
	label: string
	choices: any
	busy: boolean
	choiceLabels?: any
}): React.JSX.Element {
	return <FormControl size='small'>
		<InputLabel htmlFor={name}>
			{label}
		</InputLabel>
		<Controller
			name={name}
			control={control}
			render={renderSelect({
				name,
				label,
				choices,
				busy,
				choiceLabels,
			})} />
	</FormControl>
}
