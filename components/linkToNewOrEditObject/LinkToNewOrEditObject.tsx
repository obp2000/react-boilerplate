import 'server-only'

import type { Customer } from '@/app/[lng]/customers/helpers'
import type { Order } from '@/app/[lng]/orders/helpers'
import type { Product } from '@/app/[lng]/products/helpers'
import Tooltip from '@/client/Tooltip'
import Link from 'next/link'
import { AiOutlineEdit } from 'react-icons/ai'

export default function LinkToNewOrEditObject({
  table,
  object,
  label,
  lng
}: ({ object?: Customer | Product | Order }) &
  {table: string, label: string, lng: string }) {
  return <Link
    aria-labelledby={label}
    href={`/${lng}/${table}/${object?.id || 'new'}`}
  // prefetch={false}
  >
    <Tooltip content={label}>
      <AiOutlineEdit />
    </Tooltip>
  </Link>
}
