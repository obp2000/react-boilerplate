import {createEntityAdapter, createSelector, EntityState} from '@reduxjs/toolkit'
import {useRouter} from 'next/dist/client/router'
import {useAppSelector, useAppDispatch} from '../components/hooks'
import {getCustomers} from '../components/customers/apiSlice'
import {getProducts} from '../components/products/apiSlice'
import {getOrders} from '../components/orders/apiSlice'
import {Customer, Product, Order} from '../../interfaces'
import type {RootState} from '../components/Store'

type ObjectType = Customer & Product & Order

export type ObjectsWithTotals = EntityState<ObjectType> & {
  totalCount: number
  totalPages: number
}

export type RawObjectsWithTotals = {
  totalCount: number
  totalPages: number
  results: ObjectType[]
}

export type GetObjectsEndpoint = typeof getCustomers | typeof getProducts |
  typeof getOrders

export type SelectObjectsData = (state: RootState) =>
  ObjectsWithTotals | undefined

export const objectsAdapter = createEntityAdapter<ObjectType>({
  sortComparer: (a, b) => b.updated_at.localeCompare(a.updated_at),
})

export const objectsInitialState = objectsAdapter.getInitialState()

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

export const useObjectsData = (getObjects: GetObjectsEndpoint) => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const {query, isFallback} = router
  if (!isFallback) {
    dispatch(getObjects.initiate(query))
  }
  const selectObjectsResult = getObjects.select(query)
  const objectsResult = useAppSelector(selectObjectsResult)
  // console.log('objectsResult ', objectsResult)
  const {isLoading} = objectsResult
  const selectObjectsData =
    createSelector([selectObjectsResult], ({data}) => data)
  const objectsData = useAppSelector(selectObjectsData)
  return {
    busyLoadingObjects: isLoading || isFallback,
    totalCount: objectsData?.totalCount,
    totalPages: objectsData?.totalPages,
    selectObjectsData
  }
}

export type UseObjects = {
  busyLoadingObjects: boolean
  totalCount?: number
  totalPages?: number
  allObjects: ObjectType[]
}

export const useObjects = (getObjects: GetObjectsEndpoint): UseObjects => {
  const {
    busyLoadingObjects,
    totalCount,
    totalPages,
    selectObjectsData,
  } = useObjectsData(getObjects)
  const {selectAll} = getSelectors(selectObjectsData)
  const allObjects = useAppSelector(selectAll)
  return {
    busyLoadingObjects,
    totalCount,
    totalPages,
    allObjects
  }
}

export const useObject = (getObjects: GetObjectsEndpoint, id: number) => {
  const {
    busyLoadingObjects,
    selectObjectsData,
  } = useObjectsData(getObjects)
  const objectByIdSelector = getObjectByIdSelector(selectObjectsData, id)
  const object = useAppSelector(objectByIdSelector)
  return {
    busyLoadingObjects,
    object
  }
}
