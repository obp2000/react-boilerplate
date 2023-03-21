import 'server-only'

import TableCell from '@/app/useClient/TableCell'
import type { Translation } from "@/app/i18n/dictionaries"

export default function TableLabels({ dict: { customer } }: { dict: Translation }) {
	return <>
		<TableCell>{customer.id}</TableCell>
		<TableCell>{customer.name}</TableCell>
		<TableCell>{customer.city.city}</TableCell>
		<TableCell>{customer.address}</TableCell>
		<TableCell>{customer.createdAt}</TableCell>
		<TableCell>{customer.updatedAt}</TableCell>
	</>
}
