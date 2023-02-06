import 'server-only'

import type { Translation } from "@/app/i18n/dictionaries"
import type { Order } from './helpers'
import Date from '@/Date'
import ShortName from '@/app/[lng]/customers/ShortName'

export default function TableRow({
	object,
	dict
}: {
	object: Order
	dict: Translation
}) {
	return <>
		<td className="py-3 px-6 text-left">
			{object.id}
		</td>
		<td className="py-3 px-6 text-left">
			<ShortName {...{
				object: { nick: object.nick, name: object.name },
				labels: dict.customer,
			}} />
		</td>
		<td className="py-3 px-6 text-left">
			{object.order_items_cost}
		</td>
		<td className="py-3 px-6 text-left">
			<Date dateString={String(object.created_at)} />
		</td>
		<td className="py-3 px-6 text-left">
			<Date dateString={String(object.updated_at)} />
		</td>
	</>
}
