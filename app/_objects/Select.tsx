import {
	FormControl,
	InputLabel,
	MenuItem,
	Select
} from '@mui/material'

import type { SelectProps } from '@/interfaces/form'

export default function SelectComp({
	name,
	register,
	choices,
	choiceLabels,
	defaultValue,
	...props
}: SelectProps) {
	const {ref, ...field} = register(name, {
		setValueAs: (value) => value === '' ? null : value,
	})
	return <FormControl size='small'>
		<InputLabel htmlFor={name}>
			{props.label}
		</InputLabel>
		<Select
			{...field}
			{...props}
			defaultValue={defaultValue ?? ''}
			inputRef={ref}
			id={name}
		>
			<MenuItem value=''><em>------</em></MenuItem>
			{choices.map(({ id, name }) => <MenuItem key={id}
				value={id}>
				{choiceLabels ? choiceLabels[name] : name}
			</MenuItem>)}
		</Select>
	</FormControl>
}
