import 'server-only'

import Tooltip from '@/client/Tooltip'
import type { CustomersSelect, OrdersSelect, ProductsSelect } from '@/interfaces/api'
import Link from 'next/link'
import { AiOutlineEdit } from 'react-icons/ai'

export default function LinkToNewOrEditObject({
  indexUrl,
  object,
  label,
  lng
}: ({ object?: CustomersSelect | ProductsSelect | OrdersSelect }) &
  {indexUrl: string, label: string, lng: string }) {
  return <Link
    aria-labelledby={label}
    href={`/${lng}${indexUrl}${object?.id || 'new'}`}
  // prefetch={false}
  >
    <Tooltip content={label}>
      <AiOutlineEdit />
    </Tooltip>
  </Link>
}
