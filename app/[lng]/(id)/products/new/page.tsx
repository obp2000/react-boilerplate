import Form from '@/app/product/Form'
import { getOptions, labels } from '@/app/product/serverHelpers'
import type { ParsedUrlQuery } from 'querystring'
import { NewObjectPage } from '@/app/_objects/ObjectPage'

export default async function Page({ params }: { params: ParsedUrlQuery }) {
	const table = 'products'
	{/* @ts-expect-error Server Component */ }
	return <NewObjectPage {...{
		params,
		table,
		labels,
		getOptions,
		form: Form,
	}} />
}
