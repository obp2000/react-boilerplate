import Image from 'next/image'
import { FC, useContext } from 'react'
import { FormRenderProps } from 'react-final-form'
import type { ProductOptionsType } from '../../../interfaces/products'
import blank from '../../assets/img/blank.png'
import { OptionsContext } from '../layout/Layout'

const ProductImage: FC<FormRenderProps> = ({ values }) => {
  const { options } = useContext(OptionsContext) as ProductOptionsType
  const { imageOrig } = values
  return <Image
    src={imageOrig || blank}
    alt={options?.image.label}
    width={500}
    height={imageOrig ? 500 : 300}
    className='img-thumbnail rounded float-start'
  />
}

export default ProductImage
