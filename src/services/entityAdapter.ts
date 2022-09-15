import {
  createEntityAdapter,
  createSelector,
  EntityState
} from '@reduxjs/toolkit'
import { useRouter } from 'next/dist/client/router'
import { useAppSelector, useAppDispatch } from '../components/hooks'
import { getCustomers } from '../components/customers/apiSlice'
import { getProducts } from '../components/products/apiSlice'
import { getOrders } from '../components/orders/apiSlice'
import { anyObject } from '../../interfaces'
import type { RootState } from '../components/store'

export type ObjectsWithTotals = EntityState<anyObject> & {
  totalCount: number
  totalPages: number
}

export type GetObjectsEndpoint = typeof getCustomers | typeof getProducts |
  typeof getOrders

export type SelectObjectsData = (state: RootState) =>
  ObjectsWithTotals | undefined

export const objectsAdapter = createEntityAdapter<anyObject>({
  sortComparer: (a, b) => b.updated_at.localeCompare(a.updated_at),
})

// const initState = {
//   ids: [],
//   entities: {},
//   totalCount: 0,
//   totalPages: 0,
// }

export const objectsInitialState = objectsAdapter.getInitialState({
  totalCount: 0,
  totalPages: 0,
})

// export const objectsInitialState = objectsAdapter.getInitialState()

export const getSelectors = (selectObjectsData: SelectObjectsData) =>
  objectsAdapter.getSelectors((state: RootState) =>
    selectObjectsData(state) ?? objectsInitialState)

export const getObjectByIdSelector =
  (selectObjectsData: SelectObjectsData, id: number) =>
    (state: RootState) => getSelectors(selectObjectsData).selectById(state, id)

export const {
  setAll,
  addOne,
  upsertOne,
  removeOne,
} = objectsAdapter

export const useSelectors = (getObjects: GetObjectsEndpoint) => {
  const { query } = useRouter()
  const selectObjectsResult = getObjects.select(query)
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

export const useObjectsData = (getObjects: GetObjectsEndpoint) => {
  const dispatch = useAppDispatch()
  const { query, isFallback } = useRouter()
  if (!isFallback) {
    dispatch(getObjects.initiate(query))
  }
  const {
    selectObjectsResult,
    selectObjectsData,
    selectAll,
  } = useSelectors(getObjects)
  const { isLoading, isSuccess } = useAppSelector(selectObjectsResult)
  const { totalCount, totalPages } =
    useAppSelector(selectObjectsData) || objectsInitialState
  return {
    busyLoadingObjects: isLoading || isFallback,
    isSuccess,
    totalCount,
    totalPages,
    selectAll,
  }
}

export type UseObjects = {
  busyLoadingObjects: boolean
  totalCount?: number
  totalPages?: number
  allObjects?: anyObject[]
  selectAll: Function
}

export const useObjects = (getObjects: GetObjectsEndpoint) => {
  const {
    busyLoadingObjects,
    totalCount,
    totalPages,
    selectAll,
  } = useObjectsData(getObjects)
  const allObjects = useAppSelector(selectAll) || objectsInitialState
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
