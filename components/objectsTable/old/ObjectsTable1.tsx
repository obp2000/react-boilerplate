import 'server-only'

import Table from '@/client/Table'
import DeleteObjectButton from '@/deleteObjectButton/DeleteObjectButton'
import type { AnyObject, SearchParams } from '@/interfaces/api'
import type {
  TableConfig as CustomersTableConfig
} from '@/interfaces/customers'
import type { IndexUrl } from '@/interfaces/index'
import type { TableOptions } from '@/interfaces/options'
import type { TableConfig as OrdersTableConfig } from '@/interfaces/orders'
import type { TableConfig as ProductsTableConfig } from '@/interfaces/products'
import LinkToNewOrEditObject from
  '@/linkToNewOrEditObject/LinkToNewOrEditObject'
import Pagination from '@/pagination/Pagination'
// import { transformOptionsResponse } from '@/services/api/helpers'
import { getAuth, getObjects, getOptions } from '@/services/api/server'
// import { baseUrl } from '@/services/config'
import Header from './Header'
// import Thead from './thead'
// import Tr from './tr'

export default async function ObjectsTable(
  props: CustomersTableConfig & IndexUrl & SearchParams
): Promise<JSX.Element>
export default async function ObjectsTable(
  props: ProductsTableConfig & IndexUrl & SearchParams
): Promise<JSX.Element>
export default async function ObjectsTable(
  props: OrdersTableConfig & IndexUrl & SearchParams
): Promise<JSX.Element>
export default async function ObjectsTable({
  TableLabels,
  TableRow,
  indexUrl,
  searchParams
}: any): Promise<JSX.Element> {
  // console.log('searchParams in table', searchParams)
  // console.log('objects table')
  const { isAuthenticated, accessToken } = getAuth()
  const {
    totalCount,
    totalPages,
    results
  } = await getObjects(indexUrl, searchParams)
  // const res = await fetch(`${baseUrl}${indexUrl}`, {method: 'OPTIONS'})
  // const { commonConsts, options } = transformOptionsResponse(await res.json())
  // const trLabel = (options as TableOptions)?.name_singular
  return <>
    <Header {...{ totalCount, options }} />
    <Table size='sm' bordered striped hover className='table-secondary'>
      <thead className="thead-light">
        <tr>
          <TableLabels {...{ options }} />
          {isAuthenticated && <th scope="col" colSpan={2}>
            <LinkToNewOrEditObject {...{ commonConsts }} />
          </th>}
        </tr>
      </thead>
      <tbody>
        {results.map((object: AnyObject, key: number) => <tr key={key}
          aria-label={(options as TableOptions)?.name_singular}>
          <TableRow {...{ object, options }} />
          {isAuthenticated && <>
            <td>
              <LinkToNewOrEditObject {...{ object, commonConsts }} />
            </td>
            <td>
              <DeleteObjectButton {...{
                object, commonConsts, accessToken, indexUrl
              }} />
            </td>
          </>}
        </tr>
        )}
      </tbody>
    </Table>
    <Pagination {...{ totalPages, searchParams }} />
  </>
}


// export default ObjectsTable

          // {          {isAuthenticated && allObjects?.slice(0, 1).map((_: any,
          //   key: number) => <th scope="col" colSpan={2} key={key}>
          //     <LinkToNewOrEditObject />
          //   </th>
          // )}}
