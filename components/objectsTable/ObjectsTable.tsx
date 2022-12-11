import 'server-only'

import Table from '@/client/Table'
import DeleteObjectButton from '@/deleteObjectButton/DeleteObjectButton'
import type { AnyObject, SearchParams } from '@/interfaces/api'
import type { TableConfig as CustomersTableConfig } from '@/interfaces/customers'
import type { TableConfig as OrdersTableConfig } from '@/interfaces/orders'
import type { TableConfig as ProductsTableConfig } from '@/interfaces/products'
import LinkToNewOrEditObject from '@/linkToNewOrEditObject/LinkToNewOrEditObject'
import { getObjects } from './server'
import { getAuth } from '@/auth/server'
import Tr from './tr'
import { getOptions } from '@/options/server'
import Header from './Header'
import Pagination from '@/pagination/Pagination'
import { IndexUrl } from '@/interfaces/index'
// import path from 'path'
// import TableLabelsPl from './placeholders/TableLabels'
// import ObjectsTablePlaceholder from './placeholders/ObjectsTable'
import { Suspense } from 'react'
import HeaderPlaceholder from './placeholders/Header'

export default async function ObjectsTable(
  props: CustomersTableConfig & IndexUrl & { searchParams?: SearchParams }
): Promise<JSX.Element>
export default async function ObjectsTable(
  props: ProductsTableConfig & IndexUrl & { searchParams?: SearchParams }
): Promise<JSX.Element>
export default async function ObjectsTable(
  props: OrdersTableConfig & IndexUrl & { searchParams?: SearchParams }
): Promise<JSX.Element>
export default async function ObjectsTable({
  TableLabels,
  TableRow,
  indexUrl,
  searchParams,
}: any): Promise<JSX.Element> {
  const { isAuthenticated, accessToken } = getAuth()
  const { commonConsts, options } = await getOptions(indexUrl)
  const { totalCount, totalPages, results } =
    await getObjects({ indexUrl, searchParams })
  return <>
    <Suspense fallback={<HeaderPlaceholder />}>
      <Header {...{ totalCount, options }} />
    </Suspense>
    <Table striped bordered hover size='sm' variant='secondary'>
      <thead className="thead-light">
        <tr>
          <TableLabels {...{ options }} />
          {isAuthenticated && <th scope="col" colSpan={2}>
            <LinkToNewOrEditObject {...{ commonConsts }} />
          </th>}
        </tr>
      </thead>
      <tbody>
        {results.map((object: AnyObject, key: number) => <Tr key={key}
          {...{ options }}>
          <TableRow {...{ object, options }} />
          {isAuthenticated && <>
            <td>
              <LinkToNewOrEditObject {...{ object, commonConsts }} />
            </td>
            <td>
              <DeleteObjectButton {...{
                object,
                indexUrl,
                commonConsts,
                accessToken
              }} />
            </td>
          </>}
        </Tr>
        )}
      </tbody>
    </Table>
    <Pagination {...{ totalPages, searchParams }} />
{/*    <br />
    <br />
    <ObjectsTablePlaceholder />*/}
  </>

}
