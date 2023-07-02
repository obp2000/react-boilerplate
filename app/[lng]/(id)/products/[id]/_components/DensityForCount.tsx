import { unitsLabel } from '@/app/_objects/formHelpers'
import type { Translation } from "@/app/i18n/dictionaries"
import type { SerializedProductObject } from "@/interfaces/products"
import { TextField } from '@mui/material'
import type { UseFormWatch } from "react-hook-form"

function densityForCount({
	weightForCount,
	lengthForCount,
	width
}: Pick<SerializedProductObject,
	'weightForCount' | 'lengthForCount' | 'width'>) {
	return weightForCount && lengthForCount && width
		? Number(weightForCount) / Number(lengthForCount) / Number(width) * 100
		: 0
}

export default function DensityForCount({
	watch,
	label,
	units: {
		gram_short: gramShort,
		meter_short: meterShort
	},
}: {
	watch: UseFormWatch<SerializedProductObject>
	label: string
	units: Partial<Translation['units']>
}) {
	const [
		weightForCount,
		lengthForCount,
		width,
	] = watch([
		'weightForCount',
		'lengthForCount',
		'width',
	])
	return <TextField
		label={label}
		type="number"
		size="small"
		disabled
		value={densityForCount({ weightForCount, lengthForCount, width }).toFixed(0)}
		InputProps={unitsLabel(`${gramShort}./${meterShort}2`)}
	/>
}
