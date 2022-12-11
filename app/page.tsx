import TableLabels from '@/app/customers/TableLabels'
import TableRow from '@/app/customers/TableRow'
import type { SearchParams } from '@/interfaces/api'
import ObjectsTable from '@/objectsTable/ObjectsTable'
import path from 'path'

export default function Page({ searchParams }: SearchParams) {
  // console.log('main page ')
  const basename = path.basename(__dirname)
  const indexUrl = `/${basename === 'app' ? 'customers' : basename }/`
  return <ObjectsTable {...{
    TableLabels,
    TableRow,
    indexUrl,
    searchParams
  }} />
}
