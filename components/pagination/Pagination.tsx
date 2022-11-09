import type { TotalPages } from '@/interfaces/pagination'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FC } from 'react'
import { Pagination, PaginationItem } from 'reactstrap'
import { usePagination } from './hooks'

const PaginationComp: FC<TotalPages> = (props) => {
  const pages = usePagination(props)
  const pathname = usePathname()
  if (pages.length === 0) return null
  return <Pagination>
    {pages.map(({ label, search, active }, key) =>
      <PaginationItem key={key} {...{ active }} >
        <Link href={{ pathname, search }}
          replace
          shallow={true}
          className='page-link'
        >
          {label}
        </Link>
      </PaginationItem>)}
  </Pagination>
}

export default PaginationComp
