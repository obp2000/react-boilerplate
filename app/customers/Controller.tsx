import { getAuth } from '@/app/auth/server'
import type { ModelNames } from '@/app/i18n/dictionaries'
import { getDictionary } from '@/app/i18n/dictionaries'
import { fallbackLng } from '@/app/i18n/settings'
import type { ParsedUrlQuery } from 'querystring'
import TableLabels from './TableLabels'
import getTableRow from './getTableRow'
import { getObjects } from './db'
import Page from '@/app/objectsTable/Page'

export default async function Controller({
	params,
	searchParams,
}: {
	params: ParsedUrlQuery
	searchParams: ParsedUrlQuery
}) {
	const lng = String(params.lng || fallbackLng)
	const table = 'customers'
	const [ dict, { data, meta } ] = await Promise.all([
		getDictionary(lng),
		getObjects({ perPage: 8, searchParams }),
	])
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
