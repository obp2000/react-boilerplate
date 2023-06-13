import Form from '@/app/order/Form'
import { getOptions, labels } from '@/app/order/serverHelpers'
import { NewObjectPage } from '@/app/_objects/ObjectPage'

export default async function Page({ params }: { params: { lng: string }  }) {
	const table = 'orders'
	return <NewObjectPage {...{
		params,
		table,
		labels,
		getOptions,
		form: Form,
	}} />
}
