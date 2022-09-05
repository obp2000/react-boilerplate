import {useAppSelector} from '../hooks'
import { Table } from 'reactstrap'
import { selectAuth } from '../auth/selectors'
import Pagination from '../Pagination/Pagination'
import DeleteObjectButton from '../deleteObjectButton/DeleteObjectButton'
import Header from './Header'
import LinkToNewOrEditObject from
  '../linkToNewOrEditObject/LinkToNewOrEditObject'
import {useOptionsOuery} from '../options/hooks'
import {useObjects} from '../../services/entityAdapter'

// import {
//   Customer,
//   Product,
//   Order,
//   CustomerOptions,
//   ProductOptions,
//   OrderOptions,
//   CommonConsts,
// } from '../../../interfaces'
// import CustomerTableRow from '../customers/tableRow'
// import ProducTableRow from '../products/tableRow'
// import OrderTableRow from '../orders/tableRow'
// import CustomerTableLabels from '../customers/tableRow'
// import ProductTableLabels from '../products/tableRow'
// import OrderTableLabels from '../orders/tableRow'

import type {CustomersTableConfig} from '../customers/hooks'
import type {ProductsTableConfig} from '../products/hooks'
import type {OrdersTableConfig} from '../orders/hooks'

export type TableConfig = CustomersTableConfig & ProductsTableConfig &
  OrdersTableConfig



// function ObjectsTable(props: CustomersTable): JSX.Element
// function ObjectsTable(props: ProductsTable): JSX.Element
// function ObjectsTable(props: OrdersTable): JSX.Element
function ObjectsTable(props: TableConfig): JSX.Element {
  // console.log('props ', props)
  const {
    indexUrl,
    getObjects,
    TableRow,
    TableLabels,
  } = props
  const { isAuthenticated } = useAppSelector(selectAuth)
  const {options} = useOptionsOuery(indexUrl)
  const {allObjects, totalCount, totalPages} = useObjects(getObjects)
  // if (props.busyLoadingObjects) {return <Loader />}
  return <>
    <Header {...{totalCount, ...props}} />
    <Table size='sm' bordered striped hover className='table-secondary'>
      <thead className="thead-light">
        <tr>
          <TableLabels indexUrl={indexUrl} />
          {isAuthenticated && allObjects?.slice(0, 1).map((_: any,
            key: number): JSX.Element => <th scope="col" colSpan={2} key={key}>
              <LinkToNewOrEditObject {...{indexUrl}} />
            </th>
          )}
        </tr>
      </thead>
      <tbody>
        {allObjects?.map((object, key): JSX.Element => <tr
              key={key}
              aria-label={options?.name_singular}>
            <TableRow {...{ object, indexUrl}} />
            {isAuthenticated && <>
              <td>
                <LinkToNewOrEditObject {...{object, indexUrl}} />
              </td>
              <td>
                <DeleteObjectButton {...{object, ...props}} />
              </td>
            </>}
          </tr>
        )}
      </tbody>
    </Table>
    <Pagination {...{totalPages}} />
  </>
}

export default ObjectsTable
