import { tableLabels } from '@/app/order/serverHelpers'
import type { PropsWithChildren } from 'react'
import { TableLayout } from '@/app/_tables/TableLayout'

export default async function Layout(
	props: PropsWithChildren<{ params: { lng: string } }>
	) {
	const table = 'orders'
	return <TableLayout {...{ ...props, tableLabels, table }} />
}
