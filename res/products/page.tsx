import { indexUrl } from '@/products/serverConfig'
import type { SearchParams } from '@/interfaces/api'
import ObjectsTable from '@/objectsTable/ObjectsTable'
import { objectsTableConfig } from '@/products/config'

const Page = ({ searchParams }: SearchParams) => <ObjectsTable
	{...objectsTableConfig} {...{ indexUrl, searchParams }} />

export default Page
