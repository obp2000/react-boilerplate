import { getObjects, getTableRow } from '@/app/order/serverHelpers'
import type { ParsedUrlQuery } from 'querystring'
import { TablePage } from '@/app/_tables/TablePage'

export default async function Page(props: {
	params: ParsedUrlQuery
	searchParams: ParsedUrlQuery
}) {
	const table = 'orders'
	{/* @ts-expect-error Server Component */ }
	return <TablePage {...{
		...props,
		table,
		getObjects,
		getTableRow,
	}} />
}
