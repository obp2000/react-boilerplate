import { tableLabels } from '@/app/customer/serverHelpers'
import type { ParsedUrlQuery } from 'querystring'
import type { PropsWithChildren } from 'react'
import { TableLayout } from '@/app/_tables/TableLayout'

export default async function Layout(props: PropsWithChildren<{ params: ParsedUrlQuery }>) {
	const table = 'customers'
	{/* @ts-expect-error Server Component */ }
	return <TableLayout {...{ ...props, tableLabels, table }} />
}
