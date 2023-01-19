// import { useTranslation } from '@/app/i18n'
import { useTranslation } from '@/app/i18n'
import { fallbackLng } from '@/app/i18n/settings'
import Header from '@/objectForm/Header'
import { makeSerializable } from '@/services/util'
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'
import { notFound } from 'next/navigation'
import type { PropsWithChildren } from 'react'
import Form from './CustomerForm'
import { getObject } from './helpers'
import { getInitialValues } from './calculator'

export default async function Page({
	params: {
		lng = fallbackLng,
		id
	}
}: PropsWithChildren<Params>) {
	let [
		{ t },
		object
		] = await Promise.all([
		useTranslation(lng),
		getObject({ id })
	])
	if (id !== 'new') {
		if (!object) { notFound() }
		object = makeSerializable(object)
	}
	return <>
		<Header {...{ id, object, t, name: 'customer' }} />
		<Form {...{
			id,
			initialValues: getInitialValues({ object }),
			lng,
			save: t('save'),
			notFound: t('not_found'),
		}} />
	</>
}
