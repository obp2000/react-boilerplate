import {useRouter} from 'next/dist/client/router'
import SearchFormRender from './SearchFormRender'
import {SearchTerm} from '../../../interfaces'

export const useSearchForm = () => {
  const router = useRouter()
  const {query} = router
  return {
    name: 'search',
    onSubmit: ({term}: SearchTerm) =>
      router.push({query: {term}}, undefined, {shallow: true}),
    initialValues: {term: query.term},
    render: SearchFormRender,
  }
}
