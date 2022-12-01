import { indexUrl } from './serverConfig'
import TableLabels from './TableLabels'
import TableRow from './TableRow'
import type { SearchParams } from '@/interfaces/api'
import Header from '@/objectsTable/Header'
import ObjectsTable from '@/objectsTable/ObjectsTable'
import Pagination from '@/pagination/Pagination'

export default async function Page({ searchParams }: SearchParams) {
	return <>
		<Header {...{ indexUrl, searchParams }} />
		<ObjectsTable {...{ TableLabels, TableRow, indexUrl, searchParams }} />
		<Pagination {...{ indexUrl, searchParams }} />
	</>
}

// export default async function Page({ searchParams }: SearchParams) {
// 	return 'customers'
// }
