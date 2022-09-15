import React from 'react'
import Image from 'next/image'
import blank from '../../assets/img/blank.png'
import { Product, ProductOptions } from '../../../interfaces'

type Props = {
  object?: Product
  options?: ProductOptions
}

const ProductImage = ({ object, options }: Props): JSX.Element => <Image
  src={object?.image || blank}
  alt={options?.image.label}
  width={500}
  height={object?.image ? 500 : 300}
  className='img-thumbnail rounded float-start'
/>

export default ProductImage
