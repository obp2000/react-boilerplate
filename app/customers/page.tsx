import type { SearchParams } from '@/interfaces/api'
import ObjectsTable from '@/objectsTable/ObjectsTable'
import { indexUrl } from './serverConfig'
import TableLabels from './TableLabels'
import TableRow from './TableRow'

export default async function Page({ searchParams }: SearchParams) {
	return <ObjectsTable {...{ TableLabels, TableRow, indexUrl, searchParams }} />
}

// export default async function Page({ searchParams }: SearchParams) {
// 	return 'customers'
// }
