import { useContext } from 'react'
import type {
  Customer,
  CustomerOptionsType
} from '../../../interfaces/customers'
import type { TableRowType } from '../../../interfaces/objectsTable'
import CityName from '../cities/CityName'
import { OptionsContext } from '../layout/Layout'
import Date from '../Shared/Date'
import ShortName from './ShortName'

const TableRow = ({ object }: TableRowType<Customer>) => {
  const { options } = useContext(OptionsContext) as CustomerOptionsType
  return <>
    <td scope="row">
      {object.id}
    </td>
    <td scope="row">
      <ShortName {...{ object, options }} />
    </td>
    <td scope="row">
      <CityName object={object.city} options={options?.city.children} />
    </td>
    <td scope="row">
      {object.address}
    </td>
    <td scope="row">
      <Date dateString={object.created_at} />
    </td>
    <td scope="row">
      <Date dateString={object.updated_at} />
    </td>
  </>
}

export default TableRow