import type {
  TableConfig as CustomersTableConfig
} from '@/interfaces/customers'
// import { AnyObjectOptionsType } from '@/interfaces/options'
import type { TableConfig as OrdersTableConfig } from '@/interfaces/orders'
import type { TableConfig as ProductsTableConfig } from '@/interfaces/products'
import LinkToNewOrEditObject from '@/linkToNewOrEditObject/LinkToNewOrEditObject'

type Props = (CustomersTableConfig | ProductsTableConfig | OrdersTableConfig) &
{ isAuthenticated: boolean }

const Thead = ({ TableLabels, isAuthenticated }: Props) => <tr>
  <TableLabels />
  {isAuthenticated && <th scope="col" colSpan={2}>
    <LinkToNewOrEditObject {...{ id: undefined }} />
  </th>}
</tr>

export default Thead
