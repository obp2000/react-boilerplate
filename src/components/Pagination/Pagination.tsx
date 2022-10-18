import Link from 'next/link'
import { Pagination, PaginationItem } from 'reactstrap'
import type { TotalPages } from '../../../interfaces/pagination'
import { usePagination } from './hooks'

const PaginationComp = (props: TotalPages): JSX.Element | null => {
  const pages = usePagination(props)
  if (pages.length === 0) return null
  return <Pagination>
    {pages.map(({ label, query, active }, key) =>
      <PaginationItem key={key} {...{ active }} >
        <Link href={{ query }} replace shallow={true}>
          <a className='page-link'>
            {label}
          </a>
        </Link>
      </PaginationItem>)}
  </Pagination>
}

export default PaginationComp
