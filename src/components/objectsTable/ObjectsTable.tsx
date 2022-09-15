import React from 'react'
import { useAppSelector } from '../hooks'
import { Table } from 'reactstrap'
// import Loader from 'react-loader'
import { selectAuth } from '../auth/selectors'
import DeleteObjectButton from '../deleteObjectButton/DeleteObjectButton'
import Header from './Header'
import LinkToNewOrEditObject from
  '../linkToNewOrEditObject/LinkToNewOrEditObject'
import { useOptionsOuery } from '../options/hooks'
import { useObjects } from '../../services/entityAdapter'
import Pagination from '../Pagination/Pagination'
import type { CustomersTableConfig } from '../customers/hooks'
import type { ProductsTableConfig } from '../products/hooks'
import type { OrdersTableConfig } from '../orders/hooks'

export type TableConfig = CustomersTableConfig & ProductsTableConfig &
  OrdersTableConfig

function ObjectsTable(props: CustomersTableConfig): JSX.Element
function ObjectsTable(props: ProductsTableConfig): JSX.Element
function ObjectsTable(props: OrdersTableConfig): JSX.Element
function ObjectsTable(props: any): JSX.Element {
  const {
    indexUrl,
    getObjects,
    TableRow,
    TableLabels,
    useDeleteObjectMutation,
  } = props
  const { isAuthenticated } = useAppSelector(selectAuth)
  const { options } = useOptionsOuery(indexUrl)
  const { allObjects, totalCount, totalPages } = useObjects(getObjects)
  return <>
    <Header {...{ totalCount, indexUrl }} />
    <Table size='sm' bordered striped hover className='table-secondary'>
      <thead className="thead-light">
        <tr>
          <TableLabels {...{ indexUrl }} />
          {isAuthenticated && allObjects?.slice(0, 1).map((_: any,
            key: number): JSX.Element => <th scope="col" colSpan={2} key={key}>
              <LinkToNewOrEditObject {...{ indexUrl }} />
            </th>
          )}
        </tr>
      </thead>
      <tbody>
        {allObjects?.map((object, key): JSX.Element => <tr
          key={key}
          aria-label={options?.name_singular}>
          <TableRow {...{ object, indexUrl }} />
          {isAuthenticated && <>
            <td>
              <LinkToNewOrEditObject {...{ object, indexUrl }} />
            </td>
            <td>
              <DeleteObjectButton
                {...{ object, indexUrl, useDeleteObjectMutation }} />
            </td>
          </>}
        </tr>
        )}
      </tbody>
    </Table>
    <Pagination {...{ totalPages }} />
  </>
}

export default ObjectsTable
