import 'server-only'

import Pagination from '@/client/Pagination'
import PaginationItem from '@/client/PaginationItem'
import type { SearchParams } from '@/interfaces/api'
import { getPagination } from './helpers'
import PaginationLink from './PaginationLink'

export default async function PaginationComp({
  totalPages,
  searchParams
}: { totalPages: number } & SearchParams) {
  const pages = getPagination({ totalPages, searchParams })
  if (pages.length === 0) return null
  return <Pagination>
    {pages.map(({ label, search, query, active }, key) =>
      <PaginationItem key={key} {...{ active }} >
        <PaginationLink {...{ query }} >
          {label}
        </PaginationLink>
      </PaginationItem>)}
  </Pagination>
}
