import type { CustomerWithOptions } from '@/interfaces/customers'
import CityName from '@/cities/CityName'
import Address from './Address'
import ShortName from './ShortName'

export default function CustomerName({ object, options }: CustomerWithOptions) {
  return <>
    <ShortName {...{ object, options }} />{' '}
    <CityName object={object?.city} options={options?.city.children} />{' '}
    <Address {...{ object, options }} />
  </>
}
