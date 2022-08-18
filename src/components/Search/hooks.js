import {useRouter} from 'next/dist/client/router'
import SearchFormRender from './SearchFormRender'

export const useSearchForm = ({commonConsts}) => {
  const router = useRouter()
  const {query} = router
  return {
    name: 'search',
    // onSubmit: ({term}) => setSearchParams({term}),
    onSubmit: ({term}) =>
      router.push({query: {term}}, undefined, {shallow: true}),
    initialValues: {term: query.term},
    render: SearchFormRender,
    label: commonConsts?.search,
  }
}
