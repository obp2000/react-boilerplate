import 'server-only'

import type { Translation } from "@/app/i18n/dictionaries"
import type { Product } from './helpers'
import Date from '@/app/Date'
import ProductName from './ProductName'

export default function TableRow({
	object,
	dict
}: {
	object: Product
	dict: Translation
}) {
	return <>
		<td className="py-3 px-6 text-left">
			{object.id}
		</td>
		<td className="py-3 px-6 text-left">
			<ProductName {...{ object, labels: dict.product }} />
		</td>
		<td className="py-3 px-6 text-left">
			{object.price}
		</td>
		<td className="py-3 px-6 text-left">
			{object.width}
		</td>
		<td className="py-3 px-6 text-left">
			{object.density}
		</td>
		<td className="py-3 px-6 text-left">
			<Date dateString={String(object.created_at)} />
		</td>
		<td className="py-3 px-6 text-left">
			<Date dateString={String(object.updated_at)} />
		</td>
	</>
}
