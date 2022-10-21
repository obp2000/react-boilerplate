import { FC } from 'react'
import type { ProductWithOptions } from '../../../interfaces/products'

const ProductType: FC<ProductWithOptions> = ({ object }) => {
  if (!object?.get_product_type_display) {
    return null
  }
  return <>{object.get_product_type_display}{' '}</>
}

export default ProductType
