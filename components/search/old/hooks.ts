'use client'

import { CommonConsts } from '@/interfaces/commonConsts'
import type { SearchTerm } from '@/interfaces/search'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import SearchFormRender from './SearchFormRender'

export const useSearchForm = (commonConsts: CommonConsts| undefined) => {
  const { push } = useRouter()
  let searchPath = usePathname()
  const term = useSearchParams().get('term')
  const searchParams = new URLSearchParams()
  return {
    name: 'search',
    onSubmit: ({ term }: SearchTerm) => {
      if (term) {
        searchParams.set('term', String(term))
        searchPath += `?${searchParams}`
      }
      return push(String(searchPath))
    },
    initialValues: { term },
    render: SearchFormRender,
    commonConsts,
  }
}


// import { useRouter } from 'next/dist/client/router'

// export const useSearchForm = () => {
//   const router = useRouter()
//   const { query } = router
//   return {
//     name: 'search',
//     onSubmit: ({ term }: SearchTerm): Promise<boolean> =>
//       router.push({ query: { term } }),
//     initialValues: { term: query.term },
//     render: SearchFormRender,
//   }
// }
