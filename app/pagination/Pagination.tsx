'use client'

import Pagination from '@/app/useClient/Pagination'
import { useOnChange } from './hooks'
import { useSearchParams } from 'next/navigation'

export default function PaginationComp({ totalPages }: { totalPages: number }) {
  const searchParams = useSearchParams()
  return <Pagination count={totalPages}
    page={parseInt(searchParams?.get('page') || '1')}
    onChange={useOnChange(new URLSearchParams(searchParams ?? ''))} />
}


// import 'server-only'

// export function PaginationComp1({
//   table,
//   params: {
//     lng = fallbackLng,
//   },
//   ...props
// }: {
//   table: string
//   totalPages: number
//   params: ParsedUrlQuery
//   searchParams: ParsedUrlQuery
// }) {
//   if (props.totalPages < 2) { return null }
//   const pathname = `/${lng}/${table}/`
//   const pages = getPagination(props)
//   return <nav aria-label="Pagination">
//     <ul className="inline-flex -space-x-px">
//       {pages.map(({ label, query, className }, key) => <li key={key}>
//         <Link href={{ pathname, query }}
//           prefetch={false}
//           className={className}>
//           {label}
//         </Link>
//       </li>)}
//     </ul >
//   </nav>
// }
