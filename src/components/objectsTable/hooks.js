import {useOutletContext} from 'react-router-dom'
import {useOptionsTrigger} from '../options/hooks'
import {useObjects, useObjectsData} from '../../services/entityAdapter'

const emptyObject = {}

export const useObjectsTable = ({indexUrl, getObjects}) => {
	const {
	    options: {
	    	name_singular: nameSingular
	    } = emptyObject,
	    isAuthenticated,
	} = useOutletContext()
  	useOptionsTrigger(indexUrl)
  	const {isLoading: isLoadingObjects, allObjects} = useObjects(getObjects)
  	const {totalCount = 0, totalPages = 0} = useObjectsData(getObjects)
  	return {
  		nameSingular,
  		isAuthenticated,
	    isLoadingObjects,
	    allObjects,
	    totalCount,
	    totalPages,
  	}
}

export const useFieldLabels = (tableFieldNames) => {
  const {options = emptyObject} = useOutletContext()
  return tableFieldNames.map((tableFieldName) =>
          options[tableFieldName]?.label)
}
