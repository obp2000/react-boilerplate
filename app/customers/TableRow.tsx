import 'server-only'

import CityName from '@/cities/CityName'
import Date from '@/Date'
import type { CustomerOptionsType, CustomerType } from '@/interfaces/customers'
import ShortName from './ShortName'

export default function TableRow({
  object,
  options
}: Required<CustomerType> & CustomerOptionsType) {
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
