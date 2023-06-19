import { unitsLabel } from '@/app/_objects/formHelpers'
import type { Translation } from "@/app/i18n/dictionaries"
import type { SerializedProductObject } from "@/interfaces/products"
import { TextField } from '@mui/material'
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
	labels,
	units: {
		meter_short: meterShort
	},
}: {
	watch: UseFormWatch<SerializedProductObject>
	labels: Translation['product']
	units: Translation['units']
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
		label={labels.metersInRoll}
		type="number"
		size="small"
		disabled
		value={metersInRoll({ weight, density, width }).toFixed(2)}
		InputProps={unitsLabel(meterShort)}
	/>
}
