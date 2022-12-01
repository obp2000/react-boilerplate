import 'server-only'

import type { ProductOptionsType } from '@/interfaces/products'

export default function TableLabels({ options }: ProductOptionsType) {
  if (!options) { return null }
  return <>
    <th scope="col">
      {options.id.label}
    </th>
    <th scope="col">
      {options.name.label}
    </th>
    <th scope="col">
      {options.price.label}
    </th>
    <th scope="col">
      {options.width.label}
    </th>
    <th scope="col">
      {options.density.label}
    </th>
    <th scope="col">
      {options.created_at.label}
    </th>
    <th scope="col">
      {options.updated_at.label}
    </th>
  </>
}
