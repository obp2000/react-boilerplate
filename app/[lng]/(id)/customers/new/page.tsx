import Form from '@/app/customer/Form'
import { getOptions, labels } from '@/app/customer/serverHelpers'
import { NewObjectPage } from '@/app/_objects/ObjectPage'

export default async function Page({ params }: { params: { lng: string } }) {
	const table = 'customers'
	return <NewObjectPage {...{
		params,
		table,
		labels,
		getOptions,
		form: Form,
	}} />
}
