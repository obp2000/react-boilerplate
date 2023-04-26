import Form from '@/app/order/Form'
import { getOptions, labels } from '@/app/order/serverHelpers'
import type { ParsedUrlQuery } from 'querystring'
import { ObjectPage } from '@/app/_objects/ObjectPage'

export default async function Page({ params }: { params: ParsedUrlQuery }) {
	const table = 'orders'
	{/* @ts-expect-error Server Component */ }
	return <ObjectPage {...{
		params,
		table,
		labels,
		getOptions,
		form: Form,
	}} />
}
