import {Pagination, PaginationItem} from 'reactstrap'
import Link from 'next/link'
import {usePagination} from './hooks'

type Props = {
  totalPages?: number
}

const PaginationComp = (props: Props): JSX.Element | null => {
  const pages = usePagination(props)
  if (pages.length === 0) return null
  return <Pagination>
    {pages.map(({label, query, active}, key) =>
      <PaginationItem key={key} {...{active}} >
        <Link href={{query}} shallow={true}>
          <a className='page-link'>
            {label}
          </a>
        </Link>
      </PaginationItem>)}
  </Pagination>
}

export default PaginationComp
