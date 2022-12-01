import type { ProductWithOptions } from '@/interfaces/products'

export default function ProductType({ object }: ProductWithOptions) {
  if (!object?.get_product_type_display) {
    return null
  }
  return <>{object.get_product_type_display}{' '}</>
}
