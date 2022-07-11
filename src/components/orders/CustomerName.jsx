import PropTypes from 'prop-types'
import React from 'react'
import {customerCityOptions} from '../customers/options'
import Pindex from '../cities/Pindex'
import Address from '../customers/Address'
import ShortName from '../customers/ShortName'
import {useOrderCustomerOptions} from './options'

export const ShortCustomerName = (object) => {
  const options = useOrderCustomerOptions()
  return <ShortName {...object} options={options} />
}

ShortCustomerName.propTypes = {
  object: PropTypes.object,
}

export const CustomerName = ({
    city,
    address,
    ...shortCustomer
}) => {
  const options = useOrderCustomerOptions()
  const cityOptions = customerCityOptions(options)
  return <>
		<ShortName {...shortCustomer} options={options} /> {' '}
	  	<Pindex pindex={city?.pindex} label={cityOptions?.pindex?.label} />
	  	{' ' + city?.city} {' '}
	  	<Address address={address} label={options?.address?.label} />
  	</>
}

CustomerName.propTypes = {
  city: PropTypes.object,
  address: PropTypes.string,
  shortCustomer: PropTypes.object,
}
