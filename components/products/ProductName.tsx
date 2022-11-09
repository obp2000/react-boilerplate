import { FC } from 'react'
import type { ProductWithOptions } from '@/interfaces/products'
import Contents from './Contents'
import Fleece from './Fleece'
import ProductType from './ProductType'
import Threads from './Threads'

const ProductName: FC<ProductWithOptions> = ({ object, options }) => <>
  <ProductType {...{ object, options }} />
  <Threads {...{ object, options }} />
  <Contents {...{ object, options }} />
  <Fleece {...{ object, options }} />
  {object?.name}
</>

export default ProductName
