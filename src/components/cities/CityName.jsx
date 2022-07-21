import PropTypes from 'prop-types'
import React from 'react'
import {useOutletContext} from 'react-router-dom'
import Pindex from './Pindex'

const emptyString = ''

const CityName = ({
  city = emptyString,
  pindex = emptyString,
  options = useOutletContext().options,
}) => <>
  	<Pindex pindex={pindex} label={options?.pindex?.label} />
  	{' ' + city}
  </>

CityName.propTypes = {
  city: PropTypes.string,
  pindex: PropTypes.string,
  options: PropTypes.object,
}

export default CityName
