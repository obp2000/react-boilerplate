import 'server-only'

import Pagination from '@/client/Pagination'
import type { SearchParams } from '@/interfaces/api'
import clsx from 'clsx'
import { getPagination } from './helpers'
import PaginationLink from './PaginationLink'

export default function PaginationComp({
  totalPages,
  searchParams
}: { totalPages: number } & SearchParams) {
  const pages = getPagination({ totalPages, searchParams })
  if (pages.length === 0) return null
  return <Pagination>
    {pages.map(({ label, search, query, active }, key) => <li key={key}
      className={clsx('page-items', { active })} >
      <PaginationLink {...{ query }} >
        {label}
      </PaginationLink>
    </li>)
    }
  </Pagination >
}
