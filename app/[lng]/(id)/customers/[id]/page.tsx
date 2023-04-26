import Form from '@/app/customer/Form'
import { getOptions, labels } from '@/app/customer/serverHelpers'
import type { ParsedUrlQuery } from 'querystring'
import { ObjectPage } from '@/app/_objects/ObjectPage'

export default async function Page({ params }: { params: ParsedUrlQuery }) {
	const table = 'customers'
	{/* @ts-expect-error Server Component */ }
	return <ObjectPage {...{
		params,
		table,
		labels,
		getOptions,
		form: Form,
	}} />
}
