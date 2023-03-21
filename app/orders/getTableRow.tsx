import 'server-only'

import type { Translation } from "@/app/i18n/dictionaries"
import type { Order } from '@/interfaces/orders'
import Date from '@/app/Date'
import TableCell from '@/app/useClient/TableCell'
import { getShortName } from '@/app/customers/helpers'

export default function getTableRow(dict: Translation) {
	const shortName = getShortName(dict.customer)
	return function TableRow({
		id,
		nick,
		name,
		orderItemsCost,
		createdAt,
		updatedAt
	}: Order) {
		return <>
			<TableCell>{id}</TableCell>
			<TableCell>{shortName({ nick, name })}</TableCell>
			<TableCell>{orderItemsCost}</TableCell>
			<TableCell><Date dateString={String(createdAt)} /></TableCell>
			<TableCell><Date dateString={String(updatedAt)} /></TableCell>
		</>
	}
}
