import React from 'react'
import { ProductWithOptions } from '../../../interfaces'

const ProductType = ({ object }: ProductWithOptions) => {
  if (!object?.get_product_type_display) {
    return null
  }
  return <>{object.get_product_type_display}{' '}</>
}

export default ProductType
