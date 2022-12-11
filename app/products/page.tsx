import type { SearchParams } from '@/interfaces/api'
import ObjectsTable from '@/objectsTable/ObjectsTable'
import TableLabels from './TableLabels'
import TableRow from './TableRow'
import path from 'path'

export default function Page({ searchParams }: SearchParams) {
	const basename = path.basename(__dirname)
	const indexUrl = `/${basename === 'app' ? 'customers' : basename }/`
	// console.log('products page indexUrl ', indexUrl)
	return <ObjectsTable {...{
		TableLabels,
		TableRow,
		indexUrl,
		searchParams
	}} />
}

// export default async function Page({ searchParams }: SearchParams) {
// 	return 'products'
// }
