import 'server-only'

import type { Translation } from "@/app/i18n/dictionaries"

export default function TableLabels({ dict }: { dict: Translation }) {
	return <>
		<th className="py-3 px-6 text-left w-1/12">{dict.customer.id}</th>
		<th className="py-3 px-6 text-left w-3/12">{dict.customer.name}</th>
		<th className="py-3 px-6 text-left w-3/12">{dict.customer.city.city}</th>
		<th className="py-3 px-6 text-left w-2/12">{dict.customer.address}</th>
		<th className="py-3 px-6 text-left w-1/12">{dict.customer.created_at}</th>
		<th className="py-3 px-6 text-left w-1/12">{dict.customer.updated_at}</th>
	</>
}
