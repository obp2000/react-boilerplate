import Form from './_components/Form'
import { ObjectPage } from '@/app/_objects/ObjectPage'
import type { Translation } from '@/app/i18n/dictionaries'

function labels({ not_found: notFound, customer: labels }: Translation) {
	return {
		notFound,
		labels,
	}
}

export default async function Page({
	params
}: { params: { lng: string, id: string } }) {
	const table = 'customers'
	return <ObjectPage {...{
		params,
		table,
		labels,
		form: Form,
	}} />
}
