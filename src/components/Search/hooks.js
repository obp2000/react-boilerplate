import {useSearchParams} from 'react-router-dom'
import SearchFormRender from './SearchFormRender'

const emptyObject = {}

export const useSearchForm = (label) => {
    const [searchParams, setSearchParams] = useSearchParams()
    const term = searchParams.get('term')
    return {
      name: 'search',
      onSubmit: ({term}) => setSearchParams({term}),
      initialValues: {term},
      render: SearchFormRender,
      label,
    }
}
