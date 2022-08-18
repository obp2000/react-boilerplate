import {useLazySearchObjectsQuery} from '../Search/apiSlice'
import {useInput} from '../Shared/FieldProps'

const emptyObject = {}

const widgetMessages = (notFound) => ({
  emptyFilter: notFound,
  emptyList: () => notFound,
})

export const useSearchObjects = ({
  searchPath: url,
  renderValue,
  commonConsts,
}) => {
  const [searchTrigger, {data, isFetching}] = useLazySearchObjectsQuery()
  const onSearch = (term) => {
   	if (term.length === 2) {
   		searchTrigger({url, params: {term}}, true)
   	}
  }
 	return {
	 	data,
	 	onSearch,
	 	busy: isFetching,
    renderListItem: renderValue,
	 	messages: widgetMessages(commonConsts?.not_found),
  }
}

export const useDropdownList = ({commonConsts, ...props}) => ({
  	...useSearchObjects({commonConsts, ...props}),
  	...useInput(props),
})
