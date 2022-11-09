'use client'

import ObjectsTable from '@/objectsTable/ObjectsTable'
import { objectsTableConfig } from '@/customers/config'

const ClientPage = () => {
	return <ObjectsTable {...objectsTableConfig} />
	// return <div>ssssss111</div>
}

export default ClientPage
