import type { ProductWithOptions } from '@/interfaces/products'
import Contents from './Contents'
import Fleece from './Fleece'
import ProductType from './ProductType'
import Threads from './Threads'

export default function ProductName({ object, options }: ProductWithOptions) {
  return <>
    <ProductType {...{ object, options }} />
    <Threads {...{ object, options }} />
    <Contents {...{ object, options }} />
    <Fleece {...{ object, options }} />
    {object?.name}
  </>
}
