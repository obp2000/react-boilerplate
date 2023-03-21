import 'server-only'

import type { Translation } from "@/app/i18n/dictionaries"
import type { Product } from '@/interfaces/products'
import Date from '@/app/Date'
import TableCell from '@/app/useClient/TableCell'
import { getGetOptionLabel as getGetProductName } from './helpers'

export default function getTableRow(dict: Translation) {
	const productName = getGetProductName(dict.product)
	return function TableRow({
		id,
		price,
		width,
		density,
		createdAt,
		updatedAt,
		...rest
	}: Product) {
		return <>
			<TableCell>{id}</TableCell>
			<TableCell>{productName(rest)}</TableCell>
			<TableCell>{price}</TableCell>
			<TableCell>{width}</TableCell>
			<TableCell>{density}</TableCell>
			<TableCell><Date dateString={String(createdAt)} /></TableCell>
			<TableCell><Date dateString={String(updatedAt)} /></TableCell>
		</>
	}
}
