import consts from './consts.json'
import type { Translation } from "@/app/i18n/dictionaries"

export default function GiftWeight({
	labels: {
		gift
	},
	giftNeeded,
}: {
	labels: Translation['order']
	giftNeeded: boolean
}) {
	if (!giftNeeded) { return null }
	return <>
		{` + ${consts.GIFT_WEIGHT}(${gift})`}
	</>
}
