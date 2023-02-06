import 'server-only'

import type { Translation } from "@/app/i18n/dictionaries"
import type { Customer } from './helpers'
import ShortName from './ShortName'
import CityName from './cities/CityName'
import Date from '@/Date'

export default function TableRow({
	object,
	dict
}: {
	object: Customer
	dict: Translation
}) {
	return <>
		<td className="py-3 px-6 text-left">
			{object.id}
		</td>
		<td className="py-3 px-6 text-left">
			<ShortName {...{ object, labels: dict.customer }} />
		</td>
		<td className="py-3 px-6 text-left">
			<CityName {...{ object: object.city, labels: dict.customer.city }} />
		</td>
		<td className="py-3 px-6 text-left">
			{object.address}
		</td>
		<td className="py-3 px-6 text-left">
			<Date dateString={String(object.created_at)} />
		</td>
		<td className="py-3 px-6 text-left">
			<Date dateString={String(object.updated_at)} />
		</td>
	</>
}
