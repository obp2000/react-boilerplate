'use client'

import ObjectsTable from '@/objectsTable/ObjectsTable'
import { objectsTableConfig } from '@/products/config'

const ClientPage = () =>  <ObjectsTable {...objectsTableConfig} />

export default ClientPage
