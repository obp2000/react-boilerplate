import React from 'react'
import { Product, ProductOptions } from '../../../interfaces'

type Props = {
  object: Product
  options?: ProductOptions
}

const ProductType = ({ object }: Props) => {
  if (!object?.get_product_type_display) {
    return null
  }
  return <>{object.get_product_type_display}{' '}</>
}

export default ProductType
