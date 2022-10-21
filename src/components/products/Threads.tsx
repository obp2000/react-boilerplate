import { FC } from 'react'
import type { ProductWithOptions } from '../../../interfaces/products'

const Threads: FC<ProductWithOptions> = ({ object }) => {
  if (object?.threads == null) { return null }
  return <>{object?.get_threads_display}{' '}</>
}

export default Threads
