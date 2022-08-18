import PropTypes from 'prop-types'
import React from 'react'
import Pindex from './Pindex'
import {useCityName} from './hooks'

const CityName = (props) => {
  const {city, pindexProps} = useCityName(props)
  if (!city) {
    return null
  }
  return <>
  	<Pindex {...pindexProps} />
  	{' ' + city}
  </>
}

CityName.propTypes = {
  props: PropTypes.object,
}

export default CityName
