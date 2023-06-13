import { getObjects, getTableRow } from '@/app/product/serverHelpers'
import { TablePage } from '@/app/_tables/TablePage'

export default async function Page(props: {
	params: { lng: string }
	searchParams: { page?: string, term?: string }
}) {
	const table = 'products'
	return <TablePage {...{
		...props,
		table,
		getObjects,
		getTableRow,
	}} />
}
