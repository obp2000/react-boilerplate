import { FC } from 'react'
import type { CityWithOptions } from '../../../interfaces/cities'

const Pindex: FC<CityWithOptions> = ({ object, options }) => {
  if (!object?.pindex) { return null }
  return <>
    {options?.pindex?.label?.substring(0, 3).toLowerCase()}.{object.pindex}
  </>
}

export default Pindex
