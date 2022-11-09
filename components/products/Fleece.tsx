import { FC } from 'react'
import { ProductWithOptions } from '@/interfaces/products'

const Fleece: FC<ProductWithOptions> = ({ object, options }) => {
  if (!object?.fleece) { return null }
  return <>{options?.fleece?.label?.toLowerCase()}{' '}</>
}

export default Fleece
