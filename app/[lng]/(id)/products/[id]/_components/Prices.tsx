import type { Translation } from "@/app/i18n/dictionaries"
import type { SerializedProductObject } from "@/interfaces/products"
import { TextField } from '@mui/material'
import type { UseFormWatch } from "react-hook-form"
import priceCoeffs from './priceCoeffs.json'

function prices({
	density,
	width,
	dollarPrice,
	dollarRate
}: Pick<SerializedProductObject,
	'density' | 'width' | 'dollarPrice' | 'dollarRate'>) {
	return dollarPrice && dollarRate && density && width
		? priceCoeffs.reduce((
			result: string[],
			coeff: number): string[] => {
			result.push(`${coeff}: ${(Number(dollarPrice) * Number(dollarRate) *
				Number(density) * Number(width) / 100000 * coeff).toFixed(0)}`)
			return result
		}, []).join(' / ')
		: ''
}

export default function Prices({
	watch,
	labels,
}: {
	watch: UseFormWatch<SerializedProductObject>
	labels: Translation['product']
}) {
	const [
		width,
		density,
		dollarPrice,
		dollarRate,
	] = watch([
		'width',
		'density',
		'dollarPrice',
		'dollarRate',
	])
	return <TextField
		id="prices"
		className='col-span-4'
		label={labels.prices}
		fullWidth
		size="small"
		disabled
		value={prices({ density, width, dollarPrice, dollarRate })}
	/>
}
