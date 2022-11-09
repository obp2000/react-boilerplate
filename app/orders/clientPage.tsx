'use client'

import ObjectsTable from '@/objectsTable/ObjectsTable'
import { objectsTableConfig } from '@/orders/config'

const ClientPage = () =>  <ObjectsTable {...objectsTableConfig} />

export default ClientPage
