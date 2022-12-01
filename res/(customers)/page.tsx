import { indexUrl, objectsTableConfig } from '@/app/customers/serverConfig'
import type { SearchParams } from '@/interfaces/api'
// import { getObjects } from '@/services/api/server'
// import { ObjectsProvider } from '@/services/context'
import ObjectsTable from '@/objectsTable/ObjectsTable'
// import { objectsTableConfig } from '@/customers/config'

const Page = ({ searchParams }: SearchParams) => <ObjectsTable
	{...objectsTableConfig} {...{ indexUrl, searchParams }} />
// const Page = ({ searchParams }: SearchParams) => 'ssss'

export default Page
