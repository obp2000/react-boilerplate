import React from 'react'
import { City, CityOptions } from '../../../interfaces'

type Props = {
  object: City
  options?: CityOptions
}

const Pindex = ({ object, options }: Props): JSX.Element | null => {
  if (!object?.pindex) { return null }
  return <>
    {options?.pindex?.label.substring(0, 3).toLowerCase()}.{object.pindex}
  </>
}

export default Pindex
