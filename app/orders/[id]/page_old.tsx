import { getDictionary } from '@/app/i18n/dictionaries'
import { fallbackLng } from '@/app/i18n/settings'
import Header from '@/objectForm/Header'
import { makeSerializable } from '@/services/util'
import { notFound } from 'next/navigation'
import { ParsedUrlQuery } from 'querystring'
import { getInitialValues } from './calculator'
import { getObject } from './helpers'
import Form from './OrderForm'

export default async function Page({
	params
}: { params: ParsedUrlQuery }) {
	const isNewObject = params.id === 'new'
	let object
	if (!isNewObject) {
		try {
			object = await getObject(Number(params.id))
			object = makeSerializable(object)
		}
		catch (e) {
			notFound()
		}
	}
	const lng = String(params.lng) || fallbackLng
	const dict = await getDictionary(lng)
	return <>
		<Header {...{ isNewObject, params, object, dict, name: dict.orderSingular }} />
		<Form {...{
			lng,
			isNewObject,
			params,
			initialValues: getInitialValues({ object }),
			save: dict.save,
			message: dict.successfully,
			errorMessages: dict.errorMessages,

			add: dict.add,
			textDelete: dict.delete,
			notFound: dict.not_found,
			count: dict.count,
			labels: dict.order,
			label: dict.delete,
			okText: dict.yes,
			cancelText: dict.no,
			customerLabels: dict.customer,
			productLabels: dict.product,
		}} />
	</>
}
