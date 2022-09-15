import { useRouter } from 'next/dist/client/router'
import SearchFormRender from './SearchFormRender'
import { SearchTerm } from '../../../interfaces'

type Props = {
  indexUrl: string
}

export const useSearchForm = ({ indexUrl }: Props) => {
  const router = useRouter()
  const { query } = router
  return {
    name: 'search',
    onSubmit: ({ term }: SearchTerm): Promise<boolean> =>
      router.push({ query: { term } }, undefined, { shallow: true }),
    initialValues: { term: query.term },
    render: SearchFormRender,
    indexUrl,
  }
}
