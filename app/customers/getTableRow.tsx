import 'server-only'

import type { Translation } from "@/app/i18n/dictionaries"
import type { Customer } from '@/interfaces/customers'
import Date from '@/app/Date'
import TableCell from '@/app/useClient/TableCell'
import { getGetOptionLabel as getGetCityName } from './cities/helpers'
import { getShortName } from './helpers'

export default function getTableRow(dict: Translation) {
	const cityName = getGetCityName(dict.customer.city)
	const shortName = getShortName(dict.customer)
	return function TableRow({
		id,
		city,
		address,
		createdAt,
		updatedAt,
		...rest
	}: Customer) {
		return <>
			<TableCell>{id}</TableCell>
			<TableCell>{shortName(rest)}</TableCell>
			<TableCell>{city && cityName(city)}</TableCell>
			<TableCell>{address}</TableCell>
			<TableCell><Date dateString={String(createdAt)} /></TableCell>
			<TableCell><Date dateString={String(updatedAt)} /></TableCell>
		</>
	}
}
