import { getAuth } from '@/app/auth/server'
import type { ModelNames } from '@/app/i18n/dictionaries'
import { getDictionary } from '@/app/i18n/dictionaries'
import { fallbackLng } from '@/app/i18n/settings'
import { makeSerializable } from '@/services/util'
import { notFound } from 'next/navigation'
import { ParsedUrlQuery } from 'querystring'
import {
	getForm,
	// getGetObject,
	getGetOptions,
	// getInitObject,
	getLabels
} from './helpers'
import Page from './Page'
import tables from './tables.json'
import { getObject } from './db'

export default async function Controller({
	params,
	table
}: {
	params: ParsedUrlQuery
	table: string
}) {
	const auth = getAuth()
	if (!auth?.accessToken) {
		notFound()
	}
	const lng = String(params.lng || fallbackLng)
	let backLabel
	let title
	let createdAt
	let formProps
	let Form
	if (params.id === 'new') {
		const initialValues = tables[table as keyof typeof tables].initObject
		const [dict, labels, options, FormComp] = await Promise.all([
			// getInitObject(table),
			getDictionary(lng),
			getLabels(table),
			(await getGetOptions(table))(),
			getForm(table)
		])
		backLabel = dict.back
		title = `${dict.new} ${dict[table as keyof ModelNames].singular.toLowerCase()} `
		Form = FormComp
		formProps = {
			params,
			initialValues,
			accessToken: auth.accessToken,
			save: dict.save,
			message: dict.successfully,
			errorMessages: dict.errorMessages,
			units: dict.units,
			...labels(dict),
			...options,
		}
	} else {
		try {
			const model = tables[table as keyof typeof tables].singular
			const select = tables[table as keyof typeof tables].select.object
			const object = await getObject(Number(params.id), model, select)
			const [dict, labels, options, FormComp] = await Promise.all([
				// (await getGetObject(table))(Number(params.id)),
				getDictionary(lng),
				getLabels(table),
				(await getGetOptions(table))(),
				getForm(table)
			])
			const initialValues = makeSerializable(object)
			backLabel = dict.back
			title = `${dict[table as keyof ModelNames].singular} № ${params.id} ${dict.from.toLowerCase()} `
			createdAt = initialValues.created_at ? String(initialValues.created_at) : undefined
			Form = FormComp
			formProps = {
				params,
				initialValues,
				accessToken: auth.accessToken,
				save: dict.save,
				message: dict.successfully,
				errorMessages: dict.errorMessages,
				units: dict.units,
				...labels(dict),
				...options,
			}
		}
		catch (e) {
			notFound()
		}
	}
	const props = {
		backLabel,
		title,
		createdAt,
		Form,
		formProps
	}
	{/* @ts-expect-error Server Component */ }
	return <Page {...props} />
}
