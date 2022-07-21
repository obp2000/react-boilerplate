import PropTypes from 'prop-types'
import React from 'react'
import {useOutletContext} from 'react-router-dom'
import {customerCityOptions} from './hooks'
// import Pindex from '../cities/Pindex'
import CityName from '../cities/CityName'
import Address from './Address'
import ShortName from './ShortName'

const CustomerName = ({
    city,
    address,
    options = useOutletContext().options,
    ...shortCustomer
}) => {
  const cityOptions = customerCityOptions(options)
  return <>
		<ShortName {...{...shortCustomer, options}} />{' '}
    <CityName {...{...city, options: cityOptions}}/>{' '}
	  <Address address={address} label={options?.address?.label} />
  </>
}

CustomerName.propTypes = {
  city: PropTypes.object,
  address: PropTypes.string,
  options: PropTypes.object,
  shortCustomer: PropTypes.object,
}

export default CustomerName
