import { useContext } from 'react'
import { Table } from 'reactstrap'
import { useAppSelector } from '../hooks'
// import Loader from 'react-loader'
import type {
  TableConfig as CustomersTableConfig
} from '../../../interfaces/customers'
import type { TableOptions } from '../../../interfaces/options'
import type {
  TableConfig as OrdersTableConfig
} from '../../../interfaces/orders'
import type {
  TableConfig as ProductsTableConfig
} from '../../../interfaces/products'
import { useObjects } from '../../services/entityAdapter'
import { selectAuth } from '../auth/selectors'
import DeleteObjectButton from '../deleteObjectButton/DeleteObjectButton'
import { OptionsContext } from '../layout/Layout'
import LinkToNewOrEditObject from '../linkToNewOrEditObject/LinkToNewOrEditObject'
import Pagination from '../Pagination/Pagination'
import Header from './Header'

function ObjectsTable(props: CustomersTableConfig): JSX.Element
function ObjectsTable(props: ProductsTableConfig): JSX.Element
function ObjectsTable(props: OrdersTableConfig): JSX.Element
function ObjectsTable({
  getObjects,
  TableRow,
  TableLabels,
  useDeleteObjectMutation,
}: any) {
  const { isAuthenticated } = useAppSelector(selectAuth)
  const { options } = useContext(OptionsContext)
  const { allObjects, totalCount, totalPages } = useObjects(getObjects)
  return <>
    <Header {...{ totalCount }} />
    <Table size='sm' bordered striped hover className='table-secondary'>
      <thead className="thead-light">
        <tr>
          <TableLabels />
          {isAuthenticated && allObjects?.slice(0, 1).map((_: any,
            key: number): JSX.Element => <th scope="col" colSpan={2} key={key}>
              <LinkToNewOrEditObject />
            </th>
          )}
        </tr>
      </thead>
      <tbody>
        {allObjects?.map((object, key): JSX.Element => <tr
          key={key}
          aria-label={(options as TableOptions)?.name_singular}>
          <TableRow {...{ object }} />
          {isAuthenticated && <>
            <td>
              <LinkToNewOrEditObject {...{ object }} />
            </td>
            <td>
              <DeleteObjectButton
                {...{ object, useDeleteObjectMutation }} />
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
