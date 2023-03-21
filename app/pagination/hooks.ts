import { useRouter, usePathname } from 'next/navigation'
import type { ChangeEvent } from 'react'

export function useOnChange(searchParams: URLSearchParams) {
  const { push } = useRouter()
  const pathname = usePathname()
  return (_: ChangeEvent<unknown>, page: number) => {
    page === 1 ? searchParams.delete('page') : searchParams.set('page', String(page))
    // console.log('page ', page, `${pathname}?${search}`)
    push(`${pathname}?${searchParams}`)
  }
}
