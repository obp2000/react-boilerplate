import 'server-only'

import type { Translation } from "@/app/i18n/dictionaries"

export default function TableLabels({ dict }: { dict: Translation }) {
	return <>
		<th className="py-3 px-6 text-left">{dict.product.id}</th>
		<th className="py-3 px-6 text-left">{dict.product.name}</th>
		<th className="py-3 px-6 text-left">{dict.product.price}</th>
		<th className="py-3 px-6 text-left">{dict.product.width}</th>
		<th className="py-3 px-6 text-left">{dict.product.density}</th>
		<th className="py-3 px-6 text-left">{dict.product.created_at}</th>
		<th className="py-3 px-6 text-left">{dict.product.updated_at}</th>
	</>
}
