import React from 'react'
import type { ProductWithOptions } from '../../../interfaces/products'

const Threads = ({ object }: ProductWithOptions) => {
  if (object?.threads == null) { return null }
  return <>{object?.get_threads_display}{' '}</>
}

export default Threads
