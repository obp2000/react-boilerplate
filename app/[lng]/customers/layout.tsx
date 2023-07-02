import type { PropsWithChildren } from 'react'
import { TableLayout } from '../_components/TableLayout'
import type { Translation } from '@/app/i18n/dictionaries'

function tableLabels({ customer: {
	id,
	name,
	city: {
		city,
	},
	address,
	createdAt,
	updatedAt,
} }: Translation) {
	return [id, name, city, address, createdAt, updatedAt]
}

export default async function Layout(
	props: PropsWithChildren<{ params: { lng: string } }>
) {
	const table = 'customers'
	return <TableLayout {...{ ...props, tableLabels, table }} />
}
