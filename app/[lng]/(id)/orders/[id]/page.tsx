import Form from '@/app/order/Form'
import { getOptions, labels } from '@/app/order/serverHelpers'
import { ObjectPage } from '@/app/_objects/ObjectPage'

export default async function Page({
	params
}: { params: { lng: string, id: string } }) {
	const table = 'orders'
	return <ObjectPage {...{
		params,
		table,
		labels,
		getOptions,
		form: Form,
	}} />
}
