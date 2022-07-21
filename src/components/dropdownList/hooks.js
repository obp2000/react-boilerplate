import {useOutletContext, useNavigate} from 'react-router-dom'
import {useLazySearchObjectsQuery} from '../Search/apiSlice'
import {useInput} from '../Shared/FieldProps'

const emptyObject = {}

const widgetMessages = (notFound) => ({
  emptyFilter: notFound,
  emptyList: () => notFound,
})

export const useSearchObjects = ({searchPath: url, renderValue}) => {
	const [searchTrigger, {data, isFetching}] = useLazySearchObjectsQuery()
  	const onSearch = (term) => {
    	if (term.length === 2) {searchTrigger({url, params: {term}}, true)}
  	}
    const {
        commonConsts: {
            not_found: notFound
        } = emptyObject
    } = useOutletContext()
	  return {
	  	data,
	  	onSearch,
	  	busy: isFetching,
      	renderListItem: renderValue,
	  	messages: widgetMessages(notFound),
	  }
}

export const useDropdownList = (props) => ({
  	...useSearchObjects(props),
  	...useInput(props)
  })
