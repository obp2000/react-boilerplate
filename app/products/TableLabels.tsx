import 'server-only'

import type { Translation } from "@/app/i18n/dictionaries"
import TableCell from '@/app/useClient/TableCell'

export default function TableLabels({ dict: { product } }: { dict: Translation }) {
	return <>
		<TableCell>{product.id}</TableCell>
		<TableCell>{product.name}</TableCell>
		<TableCell>{product.price}</TableCell>
		<TableCell>{product.width}</TableCell>
		<TableCell>{product.density}</TableCell>
		<TableCell>{product.createdAt}</TableCell>
		<TableCell>{product.updatedAt}</TableCell>
	</>
}
