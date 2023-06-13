import Form from '@/app/customer/Form'
import { getOptions, labels } from '@/app/customer/serverHelpers'
import { ObjectPage } from '@/app/_objects/ObjectPage'

export default async function Page({
	params
}: { params: { lng: string, id: string } }) {
	const table = 'customers'
	return <ObjectPage {...{
		params,
		table,
		labels,
		getOptions,
		form: Form,
	}} />
}
