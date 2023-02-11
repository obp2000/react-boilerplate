import type { ModelNames } from '@/app/i18n/dictionaries'
import { getDictionary } from '@/app/i18n/dictionaries'
import { fallbackLng } from '@/app/i18n/settings'
import BackButton from '@/backButton/BackButton'
import Date from '@/Date'
import { makeSerializable } from '@/services/util'
import { notFound } from 'next/navigation'
import { ParsedUrlQuery } from 'querystring'
import {
	getForm,
	getGetInitialValues,
	getGetObject,
	getLabels,
	getOptions
} from './helpers'

export default async function Page({ params }: { params: ParsedUrlQuery }) {
	const table = String(params.table || 'customers')
	const isNewObject = params.id === 'new'
	let object
	if (!isNewObject) {
		try {
			const getObject = await getGetObject(table)
			object = await getObject(Number(params.id))
			object = makeSerializable(object)
		}
		catch (e) {
			notFound()
		}
	}
	const getInitialValues = await getGetInitialValues(table)
	const labels = await getLabels(table)
	const options = await getOptions(table)
	const Form = await getForm(table)
	const lng = String(params.lng || fallbackLng)
	const dict = await getDictionary(lng)
	const title = isNewObject
		? `${dict.new} ${dict[table as keyof ModelNames].singular.toLowerCase()} `
		: `${dict[table as keyof ModelNames].singular} № ${params.id} ${dict.from.toLowerCase()} `
	return <>
		<div className='columns-3'>
			<BackButton label={dict.back} />
			<h3 aria-label={title}>
				{title}
				{object?.created_at && <Date dateString={String(object.created_at)} />}
			</h3>
		</div>
		<Form {...{
			lng,
			isNewObject,
			params,
			initialValues: getInitialValues({ object }),
			save: dict.save,
			message: dict.successfully,
			errorMessages: dict.errorMessages,
			...labels(dict),
			...options,
		}} />
	</>
}
