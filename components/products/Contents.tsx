import { FC } from 'react'
import { ProductWithOptions } from '../../interfaces/products'

const Contents: FC<ProductWithOptions> = ({ object }) => {
  if (object?.contents == null) {
    return null
  }
  return <>{object?.get_contents_display}{' '}</>
}

export default Contents
