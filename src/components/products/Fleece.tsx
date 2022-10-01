import React from 'react'
import { ProductWithOptions } from '../../../interfaces'

const Fleece = ({ object, options }: ProductWithOptions) => {
  if (!object?.fleece) { return null }
  return <>{options?.fleece?.label?.toLowerCase()}{' '}</>
}

export default Fleece
