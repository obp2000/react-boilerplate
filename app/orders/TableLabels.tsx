import 'server-only'

import type { Translation } from "@/app/i18n/dictionaries"
import TableCell from '@/app/useClient/TableCell'

export default function TableLabels({ dict: { order } }: { dict: Translation }) {
	return <>
		<TableCell>{order.id}</TableCell>
		<TableCell>{order.customer}</TableCell>
		<TableCell>{order.orderItemsCost}</TableCell>
		<TableCell>{order.createdAt}</TableCell>
		<TableCell>{order.updatedAt}</TableCell>
	</>
}
