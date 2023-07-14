import { TableLayout } from '../_components/TableLayout'

import type { Translation } from '@/app/i18n/dictionaries'

function tableLabels({ product: {
	id,
	name,
	price,
	width,
	density,
	createdAt,
	updatedAt,
} }: Translation) {
	return [id, name, price, width, density, createdAt, updatedAt]
}

export default async function Layout(
	props: { params: { lng: string } }) {
	const table = 'products'
	return <TableLayout {...{ ...props, tableLabels, table }} />
}
