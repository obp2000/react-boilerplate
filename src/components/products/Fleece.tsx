import React from 'react'
import {Product, ProductOptions} from '../../../interfaces'

type Props = {
  object: Product
  options?: ProductOptions
}

const Fleece = ({object, options}: Props) => {
  if (!object?.fleece) { return null }
  return <>{options?.fleece?.label?.toLowerCase()}{' '}</>
}

export default Fleece
