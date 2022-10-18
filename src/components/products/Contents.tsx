import React from 'react'
import { ProductWithOptions } from '../../../interfaces/products'

const Contents = ({ object }: ProductWithOptions) => {
  if (object?.contents == null) {
    return null
  }
  return <>{object?.get_contents_display}{' '}</>
}

export default Contents
