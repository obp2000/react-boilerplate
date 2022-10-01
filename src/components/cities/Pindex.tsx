import React from 'react'
import type { CityWithOptions } from '../../../interfaces'

const Pindex = ({ object, options }: CityWithOptions): JSX.Element | null => {
  if (!object?.pindex) { return null }
  return <>
    {options?.pindex?.label?.substring(0, 3).toLowerCase()}.{object.pindex}
  </>
}

export default Pindex
