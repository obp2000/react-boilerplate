import {createEntityAdapter, createSelector} from '@reduxjs/toolkit'
import {useSelector, useDispatch} from 'react-redux'
import {useRouter} from 'next/dist/client/router'

const emptyObject = {}

export const objectsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.updated_at.localeCompare(a.updated_at),
})

export const objectsInitialState = objectsAdapter.getInitialState()

// export const getObjectsDataSelector = (selectObjectsResult) =>
// 	createSelector(
//       [selectObjectsResult],
//       ({data}) => data
//     )

export const getSelectors = (selectObjectsData) => objectsAdapter.getSelectors(
    (state) => selectObjectsData(state) ?? objectsInitialState)

export const getObjectByIdSelector = (selectObjectsData, id) => (state) =>
  getSelectors(selectObjectsData).selectById(state, id)

export const {
  setAll,
  addOne,
  upsertOne,
  removeOne,
} = objectsAdapter

export const useObjectsData = (getObjects) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const {query, isFallback} = router
  if (!isFallback) {
    dispatch(getObjects.initiate(query))
  }
  const selectObjectsResult = getObjects.select(query)
  const objectsResult = useSelector(selectObjectsResult)
  // console.log('objectsResult ', objectsResult)
  const {isLoading} = objectsResult
  const selectObjectsData = createSelector([selectObjectsResult],
      ({data}) => data
  )
  const {totalCount, totalPages} = useSelector(selectObjectsData) || emptyObject
  return {isLoading, totalCount, totalPages, selectObjectsData}
}

export const useObjects = (getObjects) => {
  const {
    isLoading,
    totalCount,
    totalPages,
    selectObjectsData,
  } = useObjectsData(getObjects)
  const {selectAll} = getSelectors(selectObjectsData)
  const allObjects = useSelector(selectAll)
  return {isLoading, totalCount, totalPages, allObjects}
}
