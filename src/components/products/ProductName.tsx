import React from 'react'
import ProductType from './ProductType'
import Threads from './Threads'
import Contents from './Contents'
import Fleece from './Fleece'
import {Product, ProductOptions} from '../../../interfaces'

type Props = {
  object: Product
  options?: ProductOptions
}

const ProductName = ({object, options}: Props) => {
  return <>
    <ProductType {...{object, options}} />
    <Threads {...{object, options}} />
    <Contents {...{object, options}} />
    <Fleece {...{object, options}} />
    {object?.name}
  </>
}

export default ProductName
