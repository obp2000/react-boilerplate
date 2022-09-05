import React from 'react'
import {Product, ProductOptions} from '../../../interfaces'

type Props = {
  object: Product
  options?: ProductOptions
}

const Threads = ({object}: Props) => {
  if (object?.threads == null) {
    return null
  }
  return <>{object?.get_threads_display}{' '}</>
}

export default Threads
