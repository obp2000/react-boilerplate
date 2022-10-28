import { FC } from 'react'
import type { CustomerWithOptions } from '../../interfaces/customers'
import CityName from '../cities/CityName'
import Address from './Address'
import ShortName from './ShortName'

const CustomerName: FC<CustomerWithOptions> = ({ object, options }) => <>
  <ShortName {...{ object, options }} />{' '}
  <CityName object={object?.city} options={options?.city.children} />{' '}
  <Address {...{ object, options }} />
</>

export default CustomerName
