import type {
  AnyObject,
  GetObjectsEndpoint,
  SelectObjectsData
} from '@/interfaces/api'
import { createEntityAdapter, createSelector } from '@reduxjs/toolkit'
// import { useRouter } from 'next/dist/client/router'
import { useSearchParams } from 'next/navigation'
import { useAppDispatch, useAppSelector } from './hooks'
import type { RootState } from './store'

export const objectsAdapter = createEntityAdapter<AnyObject>({
  sortComparer: (a, b) => b.updated_at.localeCompare(a.updated_at),
})

export const objectsInitialState = objectsAdapter.getInitialState({
  totalCount: 0,
  totalPages: 0,
})

const getSelectors = (selectObjectsData: SelectObjectsData) =>
  objectsAdapter.getSelectors((state: RootState) =>
    selectObjectsData(state) ?? objectsInitialState)

const getObjectByIdSelector =
  (selectObjectsData: SelectObjectsData, id: number) =>
    (state: RootState) => getSelectors(selectObjectsData).selectById(state, id)

export const {
  setAll,
  addOne,
  upsertOne,
  removeOne,
} = objectsAdapter

const useSelectors = (getObjects: GetObjectsEndpoint) => {
  // const { query } = useRouter()
  const searchParams = useSearchParams()
  // const selectObjectsResult = getObjects.select(query)
  const selectObjectsResult = getObjects.select(searchParams.toString())
  const selectObjectsData =
    createSelector([selectObjectsResult], ({ data }) => data)
  // const selectObjectsData = (state) => selectObjectsResult(state)?.data
  const { selectAll } = getSelectors(selectObjectsData)
  return {
    selectObjectsResult,
    selectObjectsData,
    selectAll,
  }
}

const useObjectsData = (getObjects: GetObjectsEndpoint) => {
  const dispatch = useAppDispatch()
  // const { query, isFallback } = useRouter()
  const searchParams = useSearchParams()
  // if (!isFallback) {
    dispatch(getObjects.initiate(searchParams.toString()))
  // }
  // const selectObjectsResult = getObjects.select(query)
  const selectObjectsResult = getObjects.select(searchParams.toString())
  const { isLoading, isSuccess } = useAppSelector(selectObjectsResult)
  const selectObjectsData =
    createSelector([selectObjectsResult], ({ data }) => data)
  const { totalCount, totalPages } =
    useAppSelector(selectObjectsData) || objectsInitialState
  const { selectAll } = getSelectors(selectObjectsData)
  return {
    // busyLoadingObjects: isLoading || isFallback,
    busyLoadingObjects: isLoading,
    isSuccess,
    totalCount,
    totalPages,
    selectAll,
  }
}

export const useObjects = (getObjects: GetObjectsEndpoint) => {
  const {
    busyLoadingObjects,
    totalCount,
    totalPages,
    selectAll,
  } = useObjectsData(getObjects)
  const allObjects = useAppSelector(selectAll)
  return {
    busyLoadingObjects,
    totalCount,
    totalPages,
    allObjects,
    // selectAll,
    // isSuccess,
  }
}

export const useObject = (getObjects: GetObjectsEndpoint, id: number) => {
  const { busyLoadingObjects, } = useObjectsData(getObjects)
  const { selectObjectsData, } = useSelectors(getObjects)
  const objectByIdSelector = getObjectByIdSelector(selectObjectsData, id)
  const object = useAppSelector(objectByIdSelector)
  return {
    busyLoadingObjects,
    object
  }
}
