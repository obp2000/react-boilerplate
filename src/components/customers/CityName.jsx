import PropTypes from 'prop-types'
import React from 'react'
import {useCustomerCityOptions} from './options'
import Pindex from '../cities/Pindex'

const emptyString = ''

const CityName = ({
  city = emptyString,
  pindex = emptyString
}) => {
  const options = useCustomerCityOptions()
  return <>
  	<Pindex pindex={pindex} label={options?.pindex?.label} />
  	{' ' + city}
  </>
}

CityName.propTypes = {
  city: PropTypes.string,
  pindex: PropTypes.string,
}

export default CityName
