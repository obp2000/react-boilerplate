import PropTypes from 'prop-types'
import React from 'react'
import {useCustomerName} from './hooks'
import ShortName from './ShortName'
import CityName from '../cities/CityName'
import Address from './Address'

const CustomerName = (props) => {
  const {
    shortNameProps,
    cityNameProps,
    addressProps,
  } = useCustomerName(props)
  return <>
    <ShortName {...shortNameProps} />{' '}
    <CityName {...cityNameProps} />{' '}
	  <Address {...addressProps} />
  </>
}

CustomerName.propTypes = {
  props: PropTypes.object,
}

export default CustomerName
