import { useRouter } from 'next/dist/client/router'
import SearchFormRender from './SearchFormRender'
import type { SearchTerm } from '../../../interfaces/search'

export const useSearchForm = () => {
  const router = useRouter()
  const { query } = router
  return {
    name: 'search',
    onSubmit: ({ term }: SearchTerm): Promise<boolean> =>
      router.push({ query: { term } }),
    initialValues: { term: query.term },
    render: SearchFormRender,
  }
}
