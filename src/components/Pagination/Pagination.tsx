import { Pagination, PaginationItem } from 'reactstrap'
import Link from 'next/link'
import { usePagination } from './hooks'
import type {GetObjectsEndpoint} from '../../services/entityAdapter'

type Props = {
  getObjects: GetObjectsEndpoint
}

const PaginationComp = (props: Props): JSX.Element | null => {
  // const {pathname} = useRouter()
  const pages = usePagination(props)
  if (pages.length === 0) return null
  return <Pagination>
    {pages.map(({ label, query, active }, key) =>
      <PaginationItem key={key} {...{ active }} >
        <Link href={{ query }} replace>
          <a className='page-link'>
            {label}
          </a>
        </Link>
      </PaginationItem>)}
  </Pagination>
}

export default PaginationComp
