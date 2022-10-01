import React from 'react'
import Image from 'next/image'
import blank from '../../assets/img/blank.png'
import { ProductWithOptions } from '../../../interfaces'

const ProductImage = ({
  object,
  options
}: ProductWithOptions): JSX.Element => <Image
    src={object?.image || blank}
    alt={options?.image.label}
    width={500}
    height={object?.image ? 500 : 300}
    className='img-thumbnail rounded float-start'
  />

export default ProductImage
