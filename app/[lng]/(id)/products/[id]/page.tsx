import Form from '@/app/product/Form'
import { getOptions, labels } from '@/app/product/serverHelpers'
import type { ParsedUrlQuery } from 'querystring'
import { ObjectPage } from '@/app/_objects/ObjectPage'

export default async function Page({ params }: { params: ParsedUrlQuery }) {
	const table = 'products'
	{/* @ts-expect-error Server Component */ }
	return <ObjectPage {...{
		params,
		table,
		labels,
		getOptions,
		form: Form,
	}} />
}
