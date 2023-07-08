import { ObjectPage } from '@/app/_objects/ObjectPage'
import Form from './_components/Form'
import { mutate } from './_components/actions'

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
	async function handleSubmit(formData: FormData) {
		'use server'
		await mutate({
			formData,
			params,
			table,
		})
	}
	return <ObjectPage {...{
		params,
		table,
		labels,
		form: Form,
		handleSubmit,
	}} />
}
