import { indexUrl } from '@/orders/serverConfig'
import { SearchParams } from '@/interfaces/api'
import { getObjects } from '@/services/api/server'
import { ObjectsProvider } from '@/services/context'
import ObjectsTable from '@/objectsTable/ObjectsTable'
import { objectsTableConfig } from '@/orders/config'

const Page = async ({ searchParams }: SearchParams) => {
	const objectsData = await getObjects(indexUrl, searchParams)
	return <ObjectsProvider {...objectsData}>
		<ObjectsTable {...objectsTableConfig} />
	</ObjectsProvider >
}

export default Page
