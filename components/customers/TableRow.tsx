import { FC, useContext } from 'react'
import type { Customer, CustomerOptionsType } from '@/interfaces/customers'
// import type { TableRowType } from '@/interfaces/objectsTable'
import CityName from '@/cities/CityName'
import { MainContext } from '@/services/context'
import Date from '@/Date'
import ShortName from './ShortName'
// import { AnyObject } from '@/interfaces/api'

const TableRow: FC<Customer> = (object) => {
  const { options } = useContext(MainContext) as CustomerOptionsType
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