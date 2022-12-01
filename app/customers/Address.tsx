import type { CustomerWithOptions } from '@/interfaces/customers'

export default function Address({ object, options }: CustomerWithOptions) {
  if (!object?.address) { return null }
  return <>{options?.address?.label}: {object.address}</>
}
