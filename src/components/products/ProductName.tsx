import React from 'react'
import ProductType from './ProductType'
import Threads from './Threads'
import Contents from './Contents'
import Fleece from './Fleece'
import type { ProductWithOptions } from '../../../interfaces/products'

const ProductName = ({ object, options }: ProductWithOptions) => <>
  <ProductType {...{ object, options }} />
  <Threads {...{ object, options }} />
  <Contents {...{ object, options }} />
  <Fleece {...{ object, options }} />
  {object?.name}
</>

export default ProductName
