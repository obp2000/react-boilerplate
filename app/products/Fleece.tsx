import { ProductWithOptions } from '@/interfaces/products'

export default function Fleece({ object, options }: ProductWithOptions) {
  if (!object?.fleece) { return null }
  return <>{options?.fleece?.label?.toLowerCase()}{' '}</>
}
