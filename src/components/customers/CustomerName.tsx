import React from 'react'
import ShortName from './ShortName'
import CityName from '../cities/CityName'
import Address from './Address'
import {Customer, CustomerOptions} from '../../../interfaces'

type Props = {
  object: Customer
  options: CustomerOptions
}

const CustomerName = ({object, options}: Props): JSX.Element => {
  return <>
    <ShortName {...{object, options}} />{' '}
    <CityName object={object?.city} options={options?.city.children} />{' '}
	  <Address {...{object, options}} />
  </>
}

export default CustomerName
