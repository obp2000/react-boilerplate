import type { SearchParams } from '@/interfaces/api'
import ObjectsTable from '@/objectsTable/ObjectsTable'
import TableLabels from './TableLabels'
import TableRow from './TableRow'
import path from 'path'
import { Suspense } from 'react'
import Header from '@/objectsTable/Header'
import HeaderPlaceholder from '@/objectsTable/placeholders/Header'
import { getOptions } from '@/options/server'
import { getObjects } from '@/objectsTable/server'

export default function Page({ searchParams }: SearchParams) {
	const basename = path.basename(__dirname)
	const indexUrl = `/${basename === 'app' ? 'customers' : basename }/`
	return <ObjectsTable {...{
		TableLabels,
		TableRow,
		indexUrl,
		searchParams
	}} />
}


// export default async function Page({ searchParams }: SearchParams) {
// 	return 'customers'
// }
