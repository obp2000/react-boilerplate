// import { createAction, createReducer } from 'redux-act'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../Config'
import { getObjectsAction, getObjectAction } from './ServerActions'
import { errorHandler } from './ErrorHandlers'
import { selectAuth, tokenHeaders } from './auth'
import { selectLocation } from './Router'


// const init_objects_info = {
//     results: [],
//     totalCount: 0,
//     page: null,
//     totalPages: 0,
//     term: null
// }

// export const initialState = initObject => ({
//     ...init_objects_info,
//     object: initObject
// })

const exclude_from_results = (results, id) =>
    results.filter(result => (result.id != id))

const to_object_id = id => (id == 'new') ? '' : `${id}/`

export const createCommonSlice = ({
    initObject,
    index_url
}) => {

    // const getObjectsAction = createAsyncThunk(
    //     'getObjects',
    //     async (_, { getState }) => await api.get(
    //         index_url, { params: selectLocation(getState()).query }
    //     )
    // )

    // const getObjectAction = createAsyncThunk(
    //     'getObject',
    //     async (id, { getState }) => await api.get(
    //         `${index_url}${to_object_id(id)}`,
    //         ...tokenHeaders(selectAuth(getState()).accessToken)
    //     )
    // )

    const init_objects_info = {
        results: [],
        totalCount: 0,
        totalPages: 0,
    }

    const initialState = {
        ...init_objects_info,
        object: initObject,
        status: 'idle',
        error: null
    }

    const actionsSlice = createSlice({
        name: 'actions',
        initialState,
        reducers: {
            // requestObjects: state => initialState,
            // successReceiveObjects: (state, { payload }) => payload,
            // failedReceiveObjects: state => initialState,
            requestObject: state => {
                state.object = initObject
            },
            successReceiveObject: (state, { payload }) => {
                state.object = payload
            },
            failedReceiveObject: state => {
                state.object = initObject
            },
            successUpdateObject: (state, { payload }) => {
                state.object = payload
                existingObject = state.results.find(result => result.id === payload.id)
                if (existingObject) {
                    existingObject = payload
                } else {
                    state.results.push(payload)
                    state.totalCount++
                }
                // state.results = [
                //     ...exclude_from_results(state.results, payload.object.id),
                //     payload.object
                // ]
                // if (!payload.id) state.totalCount += 1
            },
            successDeleteObject: (state, { payload }) => {
                // state.results = exclude_from_results(state.results, payload)
                state.results = state.results.filter(result => result.id !== payload)
                state.totalCount--
            },
            resetObject: state => {
                state.object = initObject
            },
        },
        extraReducers(builder) {
            builder
                .addCase(getObjectsAction.pending, (state, action) => {
                    state.status = 'pending'
                })
                .addCase(getObjectsAction.fulfilled, (state, {
                    payload: {
                        data = {}
                    }
                }) => ({ ...state,
                    ...data,
                    status: 'idle',
                    error: null
                }))
                .addCase(getObjectsAction.rejected, (state, {
                    error: {
                        message
                    }
                }) => ({ ...state,
                    ...data,
                    status: 'rejected',
                    error: message
                }))
                .addCase(getObjectAction.pending, (state, action) => {
                    state.status = 'pending'
                })
                .addCase(getObjectAction.fulfilled, (state, {
                    payload: {
                        data = {}
                    }
                }) => {
                    state.status = 'idle'
                    state.error = null
                    state.object = data
                })
                .addCase(getObjectAction.rejected, (state, {
                    error: {
                        message
                    }
                }) => {
                    state.status = 'rejected'
                    state.error = message
                    state.object = initObject
                })


        }
    })

    const {
        // requestObjects,
        // successReceiveObjects,
        // failedReceiveObjects,
        requestObject,
        successReceiveObject,
        failedReceiveObject,
        successUpdateObject,
        successDeleteObject,
        resetObject
    } = actionsSlice.actions

    return actionsSlice
}

