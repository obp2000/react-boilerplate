import type { Translation } from "@/app/i18n/dictionaries"
import type { ProductTypeType } from "@/interfaces/productTypes"
import type { SerializedProductObject } from "@/interfaces/products"
import {
	FormControl, InputLabel,
	MenuItem,
	Select
} from '@mui/material'
import { Controller, type Control } from "react-hook-form"

export default function ProductTypeId({
	control,
	labels: {
		productTypeId
	},
	busy,
	productTypes,
}: {
	control: Control<SerializedProductObject, any>
	labels: Translation['product']
	busy: boolean
	productTypes: ProductTypeType[]
}) {
	return <Controller name="productTypeId"
		control={control}
		render={({ field: { value, ...field } }) => <FormControl
			size='small'
			fullWidth>
			<InputLabel id="productTypeId-label">
				{productTypeId}
			</InputLabel>
			<Select
				{...field}
				value={value ?? ''}
				labelId="product_type_id-label"
				id="product_type_id"
				label={productTypeId}
				disabled={busy}
			>
				<MenuItem value=""><em>------</em></MenuItem>
				{productTypes.map(
					({ id, name }) => <MenuItem key={id} value={id}>
						{name}
					</MenuItem>)}
			</Select>
		</FormControl>}
	/>
}
