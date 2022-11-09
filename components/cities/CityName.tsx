import { FC } from 'react'
import type { CityWithOptions } from '@/interfaces/cities'
import Pindex from './Pindex'

const CityName: FC<CityWithOptions> = ({ object, options }) => {
  if (!object) { return null }
  return <>
    <Pindex {...{ object, options }} />
    {' ' + object.city}
  </>
}

export default CityName
