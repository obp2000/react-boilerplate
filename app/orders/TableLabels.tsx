import 'server-only'

import type { Translation } from "@/app/i18n/dictionaries"

export default function TableLabels({ dict }: { dict: Translation }) {
	return <>
		<th className="py-3 px-6 text-left">{dict.order.id}</th>
		<th className="py-3 px-6 text-left">{dict.order.customer}</th>
		<th className="py-3 px-6 text-left">{dict.order.order_items_cost}</th>
		<th className="py-3 px-6 text-left">{dict.order.created_at}</th>
		<th className="py-3 px-6 text-left">{dict.order.updated_at}</th>
	</>
}
