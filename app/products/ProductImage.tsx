import Image from 'next/image'
import { useContext } from 'react'
import { FormRenderProps } from 'react-final-form'
import type { ProductOptionsType } from '@/interfaces/products'
import { MainContext } from '@/options/context'

export default function ProductImage({ values }: FormRenderProps) {
  const { options } = useContext(MainContext) as ProductOptionsType
  const { imageOrig } = values
  return <Image
    src={imageOrig || '/blank.png'}
    alt={options?.image.label || 'Blank'}
    width={500}
    height={imageOrig ? 500 : 300}
    priority={true}
    className='img-thumbnail rounded float-start'
  />
}
