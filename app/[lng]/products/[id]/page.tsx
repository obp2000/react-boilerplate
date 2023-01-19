import { useTranslation } from '@/app/i18n'
import { fallbackLng } from '@/app/i18n/settings'
import Header from '@/objectForm/Header'
import { makeSerializable } from '@/services/util'
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'
import { notFound } from 'next/navigation'
import type { PropsWithChildren } from 'react'
import { getObject, getProductTypes } from './helpers'
import Form from './ProductForm'
import { getInitialValues } from './calculator'

export default async function Page({
	params: {
		lng = fallbackLng,
		id
	}
}: PropsWithChildren<Params>) {
	// let [object, productTypes] = await Promise.all([
	// 	getObject({ id }),
	// 	getProductTypes()
	// ])
	let [ { t }, object, productTypes ] = await Promise.all([
		useTranslation(lng),
		getObject({ id }),
		getProductTypes()
	])
	if (id !== 'new') {
		if (!object) { notFound() }
		object = makeSerializable(object)
	}
	// console.log('find object ', object)
	return <>
		<Header {...{ id, object, t, name: 'product' }} />
		<Form {...{
			id,
			initialValues: getInitialValues({ object }),
			productTypes,
			lng,
			save: t('save')
		}} />
	</>
}


	// let object
	// if (id !== 'new') {
	// 	object = await prisma.product.findUnique({
	// 		where: {
	// 			id: Number(id),
	// 		},
	// 		select,
	// 	})
	// 	// console.log('find object ', object)
	// 	if (!object) { notFound() }
	// 	object = makeSerializable(object) as ProductSelect
	// 	const productTypes = await prisma.productType.findMany({
	// 		select: {
	// 			id: true,
	// 			name: true
	// 		}
	// 	})
	// 	options.product_type.choices = productTypes
	// }