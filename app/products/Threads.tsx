import type { ProductWithOptions } from '@/interfaces/products'

export default function Threads({ object }: ProductWithOptions) {
  if (object?.threads == null) { return null }
  return <>{object?.get_threads_display}{' '}</>
}
