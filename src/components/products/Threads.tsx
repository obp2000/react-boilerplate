import React from 'react'
import { ProductWithOptions } from '../../../interfaces'

const Threads = ({ object }: ProductWithOptions) => {
  if (object?.threads == null) { return null }
  return <>{object?.get_threads_display}{' '}</>
}

export default Threads
