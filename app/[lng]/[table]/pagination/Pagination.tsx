import 'server-only'

import { fallbackLng } from '@/app/i18n/settings'
import Link from 'next/link'
import { ParsedUrlQuery } from 'querystring'
import { getPagination } from './hooks'

export default function PaginationComp({
  table,
  params: {
    lng = fallbackLng,
  },
  ...props
}: {
  table: string
  totalPages: number
  params: ParsedUrlQuery
  searchParams: ParsedUrlQuery
}) {
  if (props.totalPages < 2) { return null }
  const pathname = `/${lng}/${table}/`
  const pages = getPagination(props)
  return <nav aria-label="Pagination">
    <ul className="inline-flex -space-x-px">
      {pages.map(({ label, query, className }, key) => <li key={key}>
        <Link href={{ pathname, query }}
          prefetch={false}
          className={className}>
          {label}
        </Link>
      </li>)}
    </ul >
  </nav>
}
