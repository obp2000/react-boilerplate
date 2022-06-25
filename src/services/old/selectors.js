import {createSelector} from '@reduxjs/toolkit'
import {
	// getObjects,
	objectsAdapter,
    objectsInitialState
} from './entityAdapter'

export const getObjectsSelectors = (selectObjectsData) => {
    // const selectObjectsResult = getObjects.select(args)
    // const selectObjectsData = createSelector(
    //     [selectObjectsResult],
    //     ({data}) => data
    // )
    const {
        selectAll: selectAllObjects,
        selectById: selectObjectById
    } = objectsAdapter.getSelectors(state =>
        selectObjectsData(state) ?? objectsInitialState)
    return {
        // selectObjectsResult,
        // selectObjectsData,
        selectAllObjects,
        selectObjectById
    }
}


export const getSelectObjectsData = (selectObjectsResult) => createSelector(
    [selectObjectsResult],
    ({data}) => data
)
