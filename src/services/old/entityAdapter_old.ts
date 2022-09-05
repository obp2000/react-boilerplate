import {createEntityAdapter, createSelector, EntityState} from '@reduxjs/toolkit'
// import { EndpointDefinition } from '@reduxjs/toolkit/dist/query'
// import { ApiEndpointQuery } from '@reduxjs/toolkit/dist/query/core/module'
import {useRouter} from 'next/dist/client/router'
// import type {EntityId, Dictionary} from '@reduxjs/toolkit'
import {useAppSelector, useAppDispatch} from '../components/hooks'
import type {RootState} from '../components/Store'
import {GetObjects} from '../components/customers/apiSlice'
import {getProducts} from '../components/products/apiSlice'
import {getOrders} from '../components/orders/apiSlice'
import {Customer, Product, Order} from '../../interfaces'
// import { AnyObject } from 'final-form'
// import { Dictionary } from 'lodash'
// import { Selector } from 'react-redux'

type ObjectTypes = Customer

// export type GetObjects = typeof getCustomers | typeof getProducts | typeof getOrders

// export type 

export type SelectObjectsData = (state: RootState) => GetObjects

export const objectsAdapter = createEntityAdapter<ObjectTypes>({
  sortComparer: (a, b) => b.updated_at.localeCompare(a.updated_at),
})

export const objectsInitialState = objectsAdapter.getInitialState()

// export const getObjectsDataSelector = (selectObjectsResult) =>
// 	createSelector(
//       [selectObjectsResult],
//       ({data}) => data
//     )

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

export const useObjectsData = (getObjects: GetObjects) => {
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
    isLoading,
    totalCount: objectsData?.totalCount,
    totalPages: objectsData?.totalPages,
    selectObjectsData
  }
}

export const useObjects = (getObjects: GetObjects) => {
  const {
    isLoading,
    totalCount,
    totalPages,
    selectObjectsData,
  } = useObjectsData(getObjects)
  const {selectAll} = getSelectors(selectObjectsData)
  const allObjects = useAppSelector(selectAll)
  return {isLoading, totalCount, totalPages, allObjects}
}

export const useObject = (getObjects: GetObjects, id: number) => {
  const {
    isLoading,
    selectObjectsData,
  } = useObjectsData(getObjects)
  const objectByIdSelector = getObjectByIdSelector(selectObjectsData, id)
  const object = useAppSelector(objectByIdSelector)
  return {isLoading, object}
}
