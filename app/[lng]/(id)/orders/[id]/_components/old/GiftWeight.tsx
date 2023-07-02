import consts from './consts.json'

export default function GiftWeight({
	label,
	giftNeeded,
}: {
	label: string
	giftNeeded: boolean
}) {
	if (!giftNeeded) { return null }
	return <>
		{` + ${consts.GIFT_WEIGHT}(${label})`}
	</>
}
