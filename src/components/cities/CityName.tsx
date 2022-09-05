import React from 'react'
import Pindex from './Pindex'
import {City, CityOptions} from '../../../interfaces'

type Props = {
  object?: City
  options?: CityOptions
}

const CityName = ({object, options}: Props): JSX.Element | null => {
  if (!object) {return null}
  return <>
  	<Pindex {...{object, options}} />
  	{' ' + object.city}
  </>
}

export default CityName
