import { FormControlLabel, Switch } from '@mui/material'
import { useController } from "react-hook-form"

import type { UseControllerProps } from "react-hook-form"

export default function SwitchComp({
	label,
	busy,
	...props
}: {
	label: string
	busy: boolean
} & UseControllerProps<any> ) {
	const {
		field: { value, ...field },
		// formState: { defaultValues },
	} = useController(props)
	return <FormControlLabel
			label={label}
			htmlFor={field.name}
			control={<Switch
				{...field}
				id={field.name}
				value={!!value}
				checked={!!value}
				size='small'
				disabled={busy}
			/>}
		/>
}


// function renderSwitch({
// 	name,
// 	label,
// 	busy,
// }: {
// 	name: string
// 	label: string
// 	busy: boolean
// }) {
// 	return ({
// 		field: { value, ...field },
// 		formState: { defaultValues },
// 	}:
// 		{
// 			field: ControllerRenderProps<SerializedProductObject, 'fleece'>
// 			formState: UseFormStateReturn<SerializedProductObject>
// 		}
// 	) => {
// 		// const { fleece: init } = defaultValues as SerializedProductObject
// 		return <FormControlLabel
// 			label={label}
// 			htmlFor={name}
// 			control={<Switch
// 				{...field}
// 				id={name}
// 				value={!!value}
// 				checked={!!value}
// 				size='small'
// 				disabled={busy}
// 			/>}
// 		/>
// 	}
// }