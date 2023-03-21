import { getAuth } from '@/app/auth/server'
import type { ModelNames } from '@/app/i18n/dictionaries'
import { getDictionary } from '@/app/i18n/dictionaries'
import { fallbackLng } from '@/app/i18n/settings'
import { notFound } from 'next/navigation'
import { ParsedUrlQuery } from 'querystring'
import Page from '@/app/objectPage/Page'
import tables from '@/app/objectPage/tables.json'
import { getPrismaClient } from '@/app/objectPage/db'
import { labels, getOptions } from '../serverHelpers'
import FormComp from '../OrderForm'

export default async function Controller({
	params,
}: {
	params: ParsedUrlQuery
}) {
	const auth = getAuth()
	if (!auth?.accessToken) {
		notFound()
	}
	const lng = String(params.lng || fallbackLng)
	const table = 'orders'
	let backLabel
	let title
	let created
	let formProps
	let Form
	if (params.id === 'new') {
		const initialValues = tables[table as keyof typeof tables].initObject
		const [dict, options] = await Promise.all([
			getDictionary(lng),
			getOptions(),
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
			const { createdAt, ...object } = await getPrismaClient(model).findUniqueOrThrow({
				where: { id: Number(params.id) },
				select,
			})
			const [dict, options] = await Promise.all([
				// (await getGetObject(table))(Number(params.id)),
				getDictionary(lng),
				getOptions(),
			])
			const initialValues = JSON.parse(JSON.stringify(object))
			backLabel = dict.back
			title = `${dict[table as keyof ModelNames].singular} № ${params.id} ${dict.from.toLowerCase()} `
			created = createdAt ? String(JSON.parse(JSON.stringify(createdAt))) : undefined
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
		createdAt: created,
		Form,
		formProps
	}
	{/* @ts-expect-error Server Component */ }
	return <Page {...props} />
}
