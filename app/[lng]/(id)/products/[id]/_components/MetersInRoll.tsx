import { TextField } from '@mui/material'

import { unitsLabel } from '@/app/_objects/formHelpers'

import type { Translation } from "@/app/i18n/dictionaries"
import type { SerializedProductObject } from "@/interfaces/products"
import type { UseFormWatch } from "react-hook-form"

function metersInRoll({
  weight,
  density,
  width
}: Pick<SerializedProductObject, 'weight' | 'density' | 'width'>) {
  return weight && density && width
    ? Number(weight) * 100000 / Number(density) / Number(width)
    : 0
}

export default function MetersInRoll({
	watch,
	label,
	units: {
		meter_short: meterShort
	},
}: {
	watch: UseFormWatch<SerializedProductObject>
	label: string
	units: Partial<Translation['units']>
}) {
  const [
    width,
    weight,
    density,
  ] = watch([
    'width',
    'weight',
    'density',
  ])
	return <TextField
		id="metersInRoll"
		label={label}
		type="number"
		size="small"
		disabled
		value={metersInRoll({ weight, density, width }).toFixed(2)}
		InputProps={unitsLabel(String(meterShort))}
	/>
}
