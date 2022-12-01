import { indexUrl } from '@/app/customers/serverConfig'
import TableLabels from '@/app/customers/TableLabels'
import TableRow from '@/app/customers/TableRow'
import type { SearchParams } from '@/interfaces/api'
import NavBar from '@/navBar/NavBar'
import ObjectsTable from '@/objectsTable/ObjectsTable'

export default function Page({ searchParams }: SearchParams) {
  console.log('main page ')
  return <>
    <header>
      <NavBar {...{ indexUrl }} />
    </header>
    <main>
      <ObjectsTable {...{ TableLabels, TableRow, indexUrl, searchParams }} />
    </main>
  </>
}
