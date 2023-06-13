import { tableLabels } from '@/app/product/serverHelpers'
import type { PropsWithChildren } from 'react'
import { TableLayout } from '@/app/_tables/TableLayout'

export default async function Layout(
	props: PropsWithChildren<{ params: { lng: string } }>) {
	const table = 'products'
	return <TableLayout {...{ ...props, tableLabels, table }} />
}
