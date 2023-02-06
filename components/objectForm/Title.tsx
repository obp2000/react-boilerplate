import 'server-only'

import type { Customer } from '@/app/[lng]/customers/[id]/helpers'
import type { Order } from '@/app/[lng]/orders/[id]/helpers'
import type { Product } from '@/app/[lng]/products/[id]/helpers'
import Date from '@/Date'

export default function Title({
  object,
  title
}: {
  object?: Customer | Product | Order
  title: string
}) {
  return <h3 aria-label={title}>
    {title}
    {object?.created_at && <Date dateString={String(object.created_at)} />}
  </h3>
}
