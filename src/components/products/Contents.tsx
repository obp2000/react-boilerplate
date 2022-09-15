import React from 'react'
import { Product, ProductOptions } from '../../../interfaces'

type Props = {
  object: Product
  options?: ProductOptions
}

const Contents = ({ object }: Props) => {
  if (object?.contents == null) {
    return null
  }
  return <>{object?.get_contents_display}{' '}</>
}

export default Contents
