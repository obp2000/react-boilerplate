import { tableLabels } from '@/app/product/serverHelpers'
import type { ParsedUrlQuery } from 'querystring'
import type { PropsWithChildren } from 'react'
import { TableLayout } from '@/app/_tables/TableLayout'

export default async function Layout(props: PropsWithChildren<{ params: ParsedUrlQuery }>) {
	const table = 'products'
	{/* @ts-expect-error Server Component */ }
	return <TableLayout {...{ ...props, tableLabels, table }} />
}
