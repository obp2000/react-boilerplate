import Link from 'next/link'
import { FC } from 'react'
import { Pagination, PaginationItem } from 'reactstrap'
import type { TotalPages } from '../../interfaces/pagination'
import { usePagination } from './hooks'

const PaginationComp: FC<TotalPages> = (props) => {
  const pages = usePagination(props)
  if (pages.length === 0) return null
  return <Pagination>
    {pages.map(({ label, query, active }, key) =>
      <PaginationItem key={key} {...{ active }} >
        <Link href={{ query }} replace shallow={true} className='page-link'>
          {label}
        </Link>
      </PaginationItem>)}
  </Pagination>
}

export default PaginationComp
