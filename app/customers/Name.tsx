import type { CustomerWithOptions } from '@/interfaces/customers'

export default function Name({ object, options }: CustomerWithOptions) {
  if (!object?.name) { return null }
  return <>{options?.name?.label}: {object.name}</>
}
