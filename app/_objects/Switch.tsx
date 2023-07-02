import type { SerializedProductObject } from "@/interfaces/products"
import { FormControlLabel, Switch } from '@mui/material'
import {
	type Control,
	Controller,
	type ControllerRenderProps,
	type UseFormStateReturn
} from "react-hook-form"

function renderSwitch({
	name,
	label,
	busy,
}: {
	name: string
	label: string
	busy: boolean
}) {
	return ({
		field: { value, ...field },
		formState: { defaultValues },
	}:
		{
			field: ControllerRenderProps<SerializedProductObject, 'fleece'>
			formState: UseFormStateReturn<SerializedProductObject>
		}
	) => {
		// const { fleece: init } = defaultValues as SerializedProductObject
		return <FormControlLabel
			label={label}
			htmlFor={name}
			control={<Switch
				{...field}
				id={name}
				value={!!value}
				checked={!!value}
				size='small'
				disabled={busy}
			/>}
		/>
	}
}

export default function SwitchComp({
	name,
	control,
	label,
	busy,
}: {
	name: 'fleece'
	control: Control<SerializedProductObject, 'fleece'>
	label: string
	busy: boolean
}) {
	return <Controller
		name={name}
		control={control}
		render={renderSwitch({
			name,
			label,
			busy
		})} />
}
