'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ParsedUrlQuery } from 'querystring'
import { Children } from '@/interfaces/layout'

export default function PaginationLink({
  query,
  children
}: { query: ParsedUrlQuery | undefined } & Children) {
  const pathname = usePathname()
  return <Link
    href={{ pathname, query }}
    // prefetch={false}
    // shallow={true}
    className='page-link'>
    {children}
  </Link>
}
