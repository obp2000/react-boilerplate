import {createEntityAdapter, createSelector} from '@reduxjs/toolkit'

export const objectsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.updated_at.localeCompare(a.updated_at)
})

export const objectsInitialState = objectsAdapter.getInitialState()

export const getObjectsDataSelector = (selectObjectsResult) =>
	createSelector(
      [selectObjectsResult],
      ({data}) => data
    )

export const getSelectors = (selectObjectsData) => objectsAdapter.getSelectors(
    (state) => selectObjectsData(state) ?? objectsInitialState)

export const getObjectByIdSelector = (selectObjectsData, id) => (state) =>
	getSelectors(selectObjectsData).selectById(state, id)

export const {
    setAll,
    addOne,
    upsertOne,
    removeOne
} = objectsAdapter
