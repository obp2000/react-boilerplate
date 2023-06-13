import Form from '@/app/product/Form'
import { getOptions, labels } from '@/app/product/serverHelpers'
import { ObjectPage } from '@/app/_objects/ObjectPage'

export default async function Page({
	params
}: { params: { lng: string, id: string } }) {
	const table = 'products'
	return <ObjectPage {...{
		params,
		table,
		labels,
		getOptions,
		form: Form,
	}} />
}
