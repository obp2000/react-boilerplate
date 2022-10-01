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
import type {
  TableConfig as CustomersTableConfig
} from '../../../interfaces/customers'
import type {
  TableConfig as ProductsTableConfig
} from '../../../interfaces/products'
import type {
  TableConfig as OrdersTableConfig
} from '../../../interfaces/orders'
import type { TableOptions } from '../../../interfaces'

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
  const { options, commonConsts } = useOptionsOuery(indexUrl)
  const { allObjects, totalCount, totalPages } = useObjects(getObjects)
  return <>
    <Header {...{ totalCount }} options={options as TableOptions} />
    <Table size='sm' bordered striped hover className='table-secondary'>
      <thead className="thead-light">
        <tr>
          <TableLabels {...{ options }} />
          {isAuthenticated && allObjects?.slice(0, 1).map((_: any,
            key: number): JSX.Element => <th scope="col" colSpan={2} key={key}>
              <LinkToNewOrEditObject {...{ commonConsts }} />
            </th>
          )}
        </tr>
      </thead>
      <tbody>
        {allObjects?.map((object, key): JSX.Element => <tr
          key={key}
          aria-label={(options as TableOptions)?.name_singular}>
          <TableRow {...{ object, options }} />
          {isAuthenticated && <>
            <td>
              <LinkToNewOrEditObject {...{ object, commonConsts }} />
            </td>
            <td>
              <DeleteObjectButton
                {...{ object, commonConsts, useDeleteObjectMutation }} />
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


// export type TableConfig = CustomersTableConfig & ProductsTableConfig &
//   OrdersTableConfig

// export type Test1 = CustomersTableConfig | ProductsTableConfig |
//   OrdersTableConfig
