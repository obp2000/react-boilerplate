'use client'

import { Pagination } from '@mui/material'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import type { ChangeEvent } from 'react'

export default function PaginationComp({
  totalPages: count,
}: {
  totalPages: number
}) {
  const readOnlySearchParams = useSearchParams()
  const searchParams = new URLSearchParams(readOnlySearchParams
    ? Object.fromEntries(readOnlySearchParams)
    : undefined)
  const page = parseInt(searchParams.get('page') || '1')
  const { push } = useRouter()
  const pathname = usePathname()
  const onChange = (_: ChangeEvent<unknown>, page: number) => {
    page === 1
      ? searchParams.delete('page')
      : searchParams.set('page', String(page))
    push(`${pathname}?${searchParams}`)
  }
  return <Pagination {...{ count, page, onChange }} />
}
