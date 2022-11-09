import { useContext } from 'react'
import { Table } from 'reactstrap'
// import Loader from 'react-loader'
import DeleteObjectButton from '@/deleteObjectButton/DeleteObjectButton'
import type { ObjectsWithTotals } from '@/interfaces/api'
import type {
  TableConfig as CustomersTableConfig
} from '@/interfaces/customers'
import type { TableOptions } from '@/interfaces/options'
import type { TableConfig as OrdersTableConfig } from '@/interfaces/orders'
import type { TableConfig as ProductsTableConfig } from '@/interfaces/products'
import LinkToNewOrEditObject from '@/linkToNewOrEditObject/LinkToNewOrEditObject'
import Pagination from '@/pagination/Pagination'
import { MainContext, ObjectsContext } from '@/services/context'
import Header from './Header'

export default function ObjectsTable(props: CustomersTableConfig): JSX.Element
export default function ObjectsTable(props: ProductsTableConfig): JSX.Element
export default function ObjectsTable(props: OrdersTableConfig): JSX.Element
export default function ObjectsTable({
  TableLabels,
  TableRow
}: any): JSX.Element {
  const { options, isAuthenticated } = useContext(MainContext)
  const { totalCount, totalPages, results } =
    useContext(ObjectsContext) as ObjectsWithTotals
  return <>
    <Header {...{ totalCount }} />
    <Table size='sm' bordered striped hover className='table-secondary'>
      <thead className="thead-light">
        <tr>
          <TableLabels />
          {isAuthenticated && <th scope="col" colSpan={2}>
            <LinkToNewOrEditObject {...{ id: undefined }} />
          </th>
          }
        </tr>
      </thead>
      <tbody>
        {results?.map((object, key) => <tr
          key={key}
          aria-label={(options as TableOptions)?.name_singular}>
          <TableRow {...object} />
          {isAuthenticated && <>
            <td>
              <LinkToNewOrEditObject {...object} />
            </td>
            <td>
              <DeleteObjectButton {...object} />
            </td>
          </>}
        </tr>
        )}
      </tbody>
    </Table>
    <Pagination {...{ totalPages }} />
  </>
}


// export default ObjectsTable

          // {          {isAuthenticated && allObjects?.slice(0, 1).map((_: any,
          //   key: number) => <th scope="col" colSpan={2} key={key}>
          //     <LinkToNewOrEditObject />
          //   </th>
          // )}}
