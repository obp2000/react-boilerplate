import { getDictionary } from '@/app/i18n/dictionaries'
import { fallbackLng } from '@/app/i18n/settings'
import Header from '@/objectForm/Header'
import prisma from '@/services/prisma'
import { makeSerializable } from '@/services/util'
import { notFound } from 'next/navigation'
import { ParsedUrlQuery } from 'querystring'
import { getInitialValues } from './calculator'
import { getObject } from './helpers'
import Form from './ProductForm'

export default async function Page({ params }: { params: ParsedUrlQuery }) {
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
	const productTypes = await prisma.productType.findMany({
		select: {
			id: true,
			name: true
		}
	})
	const lng = String(params.lng) || fallbackLng
	const dict = await getDictionary(lng)
	return <>
		<Header {...{ isNewObject, params, object, dict, name: dict.productSingular }} />
		<Form {...{
			lng,
			isNewObject,
			params,
			initialValues: getInitialValues({ object }),
			save: dict.save,
			message: dict.successfully,
			errorMessages: dict.errorMessages,
			productTypes,
			labels: dict.product,
		}} />
	</>
}
