import Image from 'next/image'
import { FC, useContext } from 'react'
import { FormRenderProps } from 'react-final-form'
import type { ProductOptionsType } from '@/interfaces/products'
import { MainContext } from '@/services/context'

const ProductImage: FC<FormRenderProps> = ({ values }) => {
  const { options } = useContext(MainContext) as ProductOptionsType
  const { imageOrig } = values
  return <Image
    src={imageOrig || '/blank.png'}
    alt={options?.image.label || 'Blank'}
    width={500}
    height={imageOrig ? 500 : 300}
    className='img-thumbnail rounded float-start'
  />
}

export default ProductImage
