import type { Translation } from "@/app/i18n/dictionaries"
import type { SerializedOrderObject } from "@/interfaces/orders"
import { Calculate } from '@mui/icons-material'
import { IconButton, Tooltip } from '@mui/material'
import type { UseFormSetValue, UseFormWatch } from "react-hook-form"
import { totalWeight } from './TotalWeight'

function countPostCost({
	pindex,
	weight,
	setValue
}: {
	pindex: string
	weight: number
	setValue: UseFormSetValue<SerializedOrderObject>
}): void {
	const searchParams = new URLSearchParams({
		from_index: String(process.env.NEXT_PUBLIC_FROM_INDEX),
		to_index: pindex,
		weight: weight.toFixed(0),
	})
	fetch(`${process.env.NEXT_PUBLIC_POST_BASE_URL}?${searchParams}`)
		.then((response) => response.json())
		.then(({ posilka_nds: posilkaNds }) => {
			return setValue('postCost', posilkaNds ?? 0, { shouldDirty: true })
		})
		.catch((e) => console.error(e))
}

export default function PostCostButton({
	watch,
	labels,
	busy,
	setValue,
	count,
	giftNeeded,
}: {
	watch: UseFormWatch<SerializedOrderObject>
	labels: Translation['order']
	busy: boolean
	setValue: UseFormSetValue<SerializedOrderObject>
	count: string
	giftNeeded: boolean
}) {
	const [
		customer,
		orderItems,
	] = watch([
		'customer',
		'orderItems',
	])
	const pindex = customer?.city?.pindex
	if (!pindex) { return null }
	return <Tooltip title={count} >
		<IconButton aria-labelledby={count} disabled={busy}
			onClick={() => countPostCost({
				pindex,
				weight: totalWeight(giftNeeded, orderItems),
				setValue
			})}>
			<Calculate />
		</IconButton>
	</Tooltip>
}
