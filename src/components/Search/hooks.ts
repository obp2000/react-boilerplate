import { useRouter } from 'next/dist/client/router'
import SearchFormRender from './SearchFormRender'
import { SearchTerm, IndexUrl } from '../../../interfaces'

export const useSearchForm = ({ indexUrl }: IndexUrl) => {
  const router = useRouter()
  const { query } = router
  return {
    name: 'search',
    onSubmit: ({ term }: SearchTerm): Promise<boolean> =>
      router.push({ query: { term } }),
    initialValues: { term: query.term },
    render: SearchFormRender,
    indexUrl,
  }
}
