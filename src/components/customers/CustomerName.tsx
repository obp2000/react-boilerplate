import React from 'react'
import ShortName from './ShortName'
import CityName from '../cities/CityName'
import Address from './Address'
import type { CustomerWithOptions } from '../../../interfaces'

const CustomerName = ({
  object,
  options
}: CustomerWithOptions): JSX.Element => {
  return <>
    <ShortName {...{ object, options }} />{' '}
    <CityName object={object?.city} options={options?.city.children} />{' '}
    <Address {...{ object, options }} />
  </>
}

export default CustomerName
