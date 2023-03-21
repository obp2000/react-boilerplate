import { getAuth } from '@/app/auth/server'
import type { ModelNames } from '@/app/i18n/dictionaries'
import { getDictionary } from '@/app/i18n/dictionaries'
import { fallbackLng } from '@/app/i18n/settings'
import type { ParsedUrlQuery } from 'querystring'
import { getGetObjects, getGetTableRow, getTableLabels } from './helpers'
import Page from './Page'

export default async function Controller({
	params,
	searchParams,
	table
}: {
	params: ParsedUrlQuery
	searchParams: ParsedUrlQuery
	table: string
}) {
	const lng = String(params.lng || fallbackLng)
	const [ dict, TableLabels, getTableRow, { data, meta } ] = await Promise.all([
		getDictionary(lng),
		getTableLabels(table),
		getGetTableRow(table),
		(await getGetObjects(table))({ perPage: 8, searchParams }),
	])
	// const dict = await getDictionary(lng)
	// // const getObjects = await getGetObjects(table)
	// const { data, meta } = await (await getGetObjects(table))({ perPage: 8, searchParams })
	// const TableLabels = await getTableLabels(table)
	// const getTableRow = await getGetTableRow(table)
	const Row = getTableRow(dict)
	const auth = getAuth()
	const modelNameSingular = dict[table as keyof ModelNames].singular
	const modelNamePlural = dict[table as keyof ModelNames].plural
	const deletePath = `${process.env.NEXT_PUBLIC_BASE_URL}/${table}/`
	const props = {
		lng,
		table,
		dict,
		TableLabels,
		Row,
		data,
		total: meta?.total,
		totalPages: meta?.lastPage,
		isAuthenticated: auth?.isAuthenticated,
		accessToken: auth?.accessToken,
		modelNameSingular,
		modelNamePlural,
		deletePath,
	}
	return <Page {...props} />
}
