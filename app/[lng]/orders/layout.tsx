import type { PropsWithChildren } from 'react'
import { TableLayout } from '../_components/TableLayout'
import type { Translation } from '@/app/i18n/dictionaries'

function tableLabels({ order: {
	id,
	customer,
	orderItemsCost,
	createdAt,
	updatedAt,
} }: Translation) {
	return [id, customer, orderItemsCost, createdAt, updatedAt,]
}

export default async function Layout(
	props: PropsWithChildren<{ params: { lng: string } }>
) {
	const table = 'orders'
	return <TableLayout {...{ ...props, tableLabels, table }} />
}
