import {useRouter} from 'next/dist/client/router'
import {useObjects, useObjectsData} from '../../services/entityAdapter'
import {useOptionsOuery} from '../options/hooks'

export const useObjectsTable = ({
  getObjects,
  indexUrl,
}) => {
  const router = useRouter()
  const {isFallback} = router
  const {commonConsts, options} = useOptionsOuery(indexUrl)
  const {isLoading: isLoadingObjects, allObjects} = useObjects(getObjects)
  const {totalCount = 0, totalPages = 0} = useObjectsData(getObjects)
  return {
    commonConsts,
    options,
    busyLoadingObjects: isLoadingObjects || isFallback,
    allObjects,
    totalCount,
    totalPages,
  }
}

export const useFieldLabels = ({
  tableFieldNames,
  options = {}}
) => tableFieldNames.map((tableFieldName) => options[tableFieldName]?.label)
