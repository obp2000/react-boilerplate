import React from 'react'
import Pindex from './Pindex'
import type { CityWithOptions} from '../../../interfaces'

const CityName = ({ object, options }: CityWithOptions): JSX.Element | null => {
  if (!object) { return null }
  return <>
    <Pindex {...{ object, options }} />
    {' ' + object.city}
  </>
}

export default CityName
