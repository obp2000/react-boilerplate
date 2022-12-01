import 'server-only'

import Table from '@/client/Table'
import DeleteObjectButton from '@/deleteObjectButton/DeleteObjectButton'
import type { AnyObject, SearchParams } from '@/interfaces/api'
import type {
  Customer,
  TableConfig as CustomersTableConfig
} from '@/interfaces/customers'
import type {
  Order,
  TableConfig as OrdersTableConfig
} from '@/interfaces/orders'
import type {
  Product,
  TableConfig as ProductsTableConfig
} from '@/interfaces/products'
import LinkToNewOrEditObject from '@/linkToNewOrEditObject/LinkToNewOrEditObject'
import { getAuth, getObjects } from '@/services/api/server'
import Tr from './tr'
import { IndexUrl } from '@/interfaces/index'
import { getOptions } from '@/services/api/options'
import Header from './Header'
import Pagination from '@/pagination/Pagination'

export default async function ObjectsTable(
  props: CustomersTableConfig & IndexUrl &
  { searchParams: SearchParams }
): Promise<JSX.Element>
export default async function ObjectsTable(
  props: ProductsTableConfig & IndexUrl &
  { searchParams: SearchParams }
): Promise<JSX.Element>
export default async function ObjectsTable(
  props: OrdersTableConfig & IndexUrl &
  { searchParams: SearchParams }
): Promise<JSX.Element>
export default async function ObjectsTable({
  TableLabels,
  TableRow,
  // results,
  indexUrl,
  searchParams,
  // commonConsts,
  // options
}: any): Promise<JSX.Element> {
  const { isAuthenticated } = getAuth()
  // console.log('objects table table')
  const { commonConsts, options } = await getOptions(indexUrl)
  const { totalCount, totalPages, results } =
    await getObjects(indexUrl, searchParams)
  return <>
    <Header {...{ totalCount, options }} />
    <Table size='sm' bordered striped hover className='table-secondary'>
      <thead className="thead-light">
        <tr>
          <TableLabels {...{ options }} />
          {isAuthenticated && <th scope="col" colSpan={2}>
            <LinkToNewOrEditObject {...{ indexUrl, commonConsts }} />
          </th>}
        </tr>
      </thead>
      <tbody>
        {results.map((object: AnyObject, key: number) => <Tr key={key}
          {...{ options }}>
          <TableRow {...{ object, options }} />
          {isAuthenticated && <>
            <td>
              <LinkToNewOrEditObject {...{ object, indexUrl, commonConsts }} />
            </td>
            <td>
              <DeleteObjectButton {...{ object, indexUrl, commonConsts }} />
            </td>
          </>}
        </Tr>
        )}
      </tbody>
    </Table>
    <Pagination {...{ totalPages, searchParams }} />
  </>
}
