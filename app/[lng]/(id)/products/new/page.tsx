import Form from '@/app/product/Form'
import { getOptions, labels } from '@/app/product/serverHelpers'
import { NewObjectPage } from '@/app/_objects/ObjectPage'

export default async function Page({
	params
}: { params: { lng: string } }) {
	const table = 'products'
	return <NewObjectPage {...{
		params,
		table,
		labels,
		getOptions,
		form: Form,
	}} />
}
