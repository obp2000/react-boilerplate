import { useRouter } from 'next/dist/client/router'
import type { SearchTerm } from '../../interfaces/search'
import SearchFormRender from './SearchFormRender'

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
