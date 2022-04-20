import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../Config'
// import { selectAuth, tokenHeaders } from './auth'

export const searchObjectsThunk = search_path => createAsyncThunk(
    'searchObjects',
    async term => {
        if (typeof(term) == 'string' && term.length > 1) {
            const {
                data: {
                    results
                }
            } = await api.get(
                search_path, {
                    params: {
                        term: decodeURIComponent(term),
                        page_size: 1000000
                    }
                },
            )
            return results
        }
    }
)

const searchObjectsAction = searchObjectsThunk()

// export const searchObjectsAction = (dispatch, search_path, accessToken) => term => {
//     if (accessToken && typeof(term) == 'string' && term.length > 1) {
//         dispatch(requestSearchObjects())
//         return axios.get(`${config.BACKEND}/api${search_path}/`, {
//                 params: {
//                     term: decodeURIComponent(term),
//                     page_size: 1000000
//                 },
//                 // ...tokenHeaders(accessToken)
//             })
//             .then(({
//                 data: {
//                     results
//                 }
//             }) => {
//                 dispatch(successSearchObjects(results))
//                 dispatch(clearErrors())
//             })
//             .catch(errorHandler(dispatch, failedSearchObjects))
//     }
// }

const initialState = {
    data: [],
    isFetching: false,
    loaded: false,
    isFieldFetching: false,
    status: 'idle',
    error: null
}

export const tempStateSlice = createSlice({
    name: 'temp_state',
    initialState,
    reducers: {
        startRequest: state => {
            state.isFetching = true
            state.loaded = false
        },
        successRequest: state => {
            state.isFetching = false
            state.loaded = true
        },
        failedRequest: state => {
            state.isFetching = false
            state.loaded = false
        },
        requestSearchObjects: state => {
            state.data = initialState.data
            state.isFieldFetching = true
        },
        successSearchObjects: (state, { payload }) => {
            state.data = payload
            state.isFieldFetching = false
        },
        failedSearchObjects: state => {
            state.data = initialState.data
            state.isFieldFetching = false
        },
        clearSearchObjects: state => {
            state.data = initialState.data
        }
    },
    extraReducers(builder) {
        builder
            .addCase(searchObjectsAction.pending, (state, action) => {
                state.status = 'pending'
                state.data = initialState.data
            })
            .addCase(searchObjectsAction.fulfilled, (state, { payload }) => {
                state.status = initialState.status
                state.error = initialState.error
                state.data = payload
            })
            .addCase(searchObjectsAction.rejected, (state, {
                error: {
                    message
                }
            }) => {
                state.status = 'rejected'
                state.error = message
                state.data = initialState.data
            })
    }
})

export const {
    startRequest,
    successRequest,
    failedRequest,
    requestSearchObjects,
    successSearchObjects,
    failedSearchObjects,
    clearSearchObjects
} = tempStateSlice.actions

export default tempStateSlice.reducer

export const selectTempState = ({
    temp_state
}) => temp_state







// export const startRequest = createAction('startRequest')
// export const successRequest = createAction('successRequest')
// export const failedRequest = createAction('failedRequest')

// export const requestSearchObjects = createAction('requestSearchObjects')
// export const successSearchObjects = createAction('successSearchObjects')
// export const failedSearchObjects = createAction('failedSearchObjects')
// export const clearSearchObjects = createAction('clearSearchObjects')

// const reducer_actions = {}

// const initialState = {
//     data: [],
//     isFetching: false,
//     loaded: false,
//     isFieldFetching: false
// }

// reducer_actions[startRequest] = state =>
//     ({
//         ...state,
//         isFetching: true,
//         loaded: false,
//     })

// reducer_actions[successRequest] = state =>
//     ({
//         ...state,
//         isFetching: false,
//         loaded: true,
//     })

// reducer_actions[failedRequest] = state =>
//     ({
//         ...state,
//         isFetching: false,
//         loaded: false,
//     })

// reducer_actions[requestSearchObjects] = state =>
//     ({
//         ...state,
//         data: [],
//         isFieldFetching: true
//     })

// reducer_actions[successSearchObjects] = (state, data) =>
//     ({
//         ...state,
//         data,
//         isFieldFetching: false
//     })

// reducer_actions[failedSearchObjects] = state =>
//     ({
//         ...state,
//         data: [],
//         isFieldFetching: false
//     })

// reducer_actions[clearSearchObjects] = state =>
//     ({
//         ...state,
//         data: []
//     })

// const TempState = createReducer(reducer_actions, initialState)

// export default TempState