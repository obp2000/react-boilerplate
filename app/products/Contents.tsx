import { ProductWithOptions } from '@/interfaces/products'

export default function Contents({ object }: ProductWithOptions) {
  if (object?.contents == null) { return null }
  return <>{object?.get_contents_display}{' '}</>
}
