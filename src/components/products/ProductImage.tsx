import React, { useContext } from 'react'
import Image from 'next/image'
import { OptionsContext } from '../layout/Layout'
import blank from '../../assets/img/blank.png'
import type {
  ProductType,
  ProductOptionsType
} from '../../../interfaces/products'

const ProductImage = ({ object }: ProductType): JSX.Element => {
  const { options } = useContext(OptionsContext) as ProductOptionsType
  return <Image
    src={object?.image || blank}
    alt={options?.image.label}
    width={500}
    height={object?.image ? 500 : 300}
    className='img-thumbnail rounded float-start'
  />
}

export default ProductImage
