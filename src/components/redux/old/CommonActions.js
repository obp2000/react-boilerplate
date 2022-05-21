import {createAction, createReducer} from 'redux-act'
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {objectToFormData} from 'object-to-formdata'
import {toast} from 'react-toastify'
// import { getObjectAction } from './ServerActions'
import {errorHandler} from './ErrorHandlers'
// import { api } from '../Config'
// import { selectLocation } from './Router'
import {selectAuth, tokenHeaders} from './auth'
import {selectCommonConsts} from './CommonConsts'

const to_object_id = (id) => ((id == 'new') ? '' : `${id}/`)

// export const getObjectsThunk = indexUrl => createAsyncThunk(
//     'getObjects',
//     async (_, { getState }) => {
//         const { data } = await api.get(
//             indexUrl, { params: selectLocation(getState()).query }
//         )
//         return data
//     }
// )

// export const getObjectThunk = indexUrl => createAsyncThunk(
//     'getObject',
//     async (id, { getState }) => {
//         const { data } = await api.get(
//             `${indexUrl}${to_object_id(id)}`,
//             tokenHeaders(selectAuth(getState()).accessToken)
//         )
//         return data
//     }
// )

// export const createOrUpdateObjectThunk = ({
//     indexUrl,
//     preSubmitAction,
//     to_form_data
// } = {}) => createAsyncThunk(
//     'createOrUpdateObject',
//     async (values, { getState }) => {
//         const state = getState()
//         const accessToken = selectAuth(state).accessToken
//         if (accessToken) {
//             if (preSubmitAction) preSubmitAction(values)
//             const id = values.id
//             const { data } = await api.request({
//                 url: `${indexUrl}${ id ? id + '/' : ''}`,
//                 method: id ? 'PUT' : 'POST',
//                 data: to_form_data ? objectToFormData(values) : values,
//                 ...tokenHeaders(accessToken, to_form_data),
//             })
//             toast.success(selectCommonConsts(state).successfully)
//             return data
//         }
//     }
// )

export const deleteObjectThunk = (indexUrl) => createAsyncThunk(
    'deleteObject',
    async (id, {getState}) => {
      await api.delete(
          `${indexUrl}${to_object_id(id)}`,
          tokenHeaders(selectAuth(getState()).accessToken),
      )
      return to_object_id(id)
    },
)

export const createCommonSlice = (initObject) => {
  const init_objects_info = {
    results: [],
    totalCount: 0,
    totalPages: 0,
  }

  const initialState = {
    ...init_objects_info,
    object: initObject,
    status: 'idle',
    error: null,
  }

  const getObjectsAction = getObjectsThunk()
  const getObjectAction = getObjectThunk()
  const createOrUpdateObjectAction = createOrUpdateObjectThunk()
  const deleteObjectAction = deleteObjectThunk()

  const actionsSlice = createSlice({
    name: 'actions',
    initialState,
    reducers: {
      // requestObjects: state => initialState,
      // successReceiveObjects: (state, { payload }) => payload,
      // failedReceiveObjects: state => initialState,
      // requestObject: state => {
      //     state.object = initObject
      // },
      // successReceiveObject: (state, { payload }) => {
      //     state.object = payload
      // },
      // failedReceiveObject: state => {
      //     state.object = initObject
      // },
      successUpdateObject: (state, {payload}) => {
        state.object = payload
        const existingObject = state.results.find((result) => result.id === payload.id)
        // console.log('existingObject ', existingObject)
        if (existingObject) {
          state.results[existingObject.id] = payload
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
      successDeleteObject: (state, {payload}) => {
        // state.results = exclude_from_results(state.results, payload)
        state.results = state.results.filter((result) => result.id !== payload)
        state.totalCount--
      },
      resetStatus: (state, {payload}) => {
        // state.results = exclude_from_results(state.results, payload)
        state.status = initialState.status
      },
    },
    extraReducers(builder) {
      builder
          .addCase(getObjectsAction.pending, (state, action) => {
            state.status = 'pending'
          })
          .addCase(getObjectsAction.fulfilled, (state, {payload}) => ({
            ...state,
            ...payload,
            status: 'idle',
            error: null,
          }))
          .addCase(getObjectsAction.rejected, (state, {
            error: {
              message,
            },
          }) => ({
            ...state,
            ...init_objects_info,
            status: 'rejected',
            error: message,
          }))
          .addCase(getObjectAction.pending, (state, action) => {
            state.status = 'pending'
          })
          .addCase(getObjectAction.fulfilled, (state, {
            payload,
          }) => {
            state.status = initialState.status
            state.error = null
            state.object = payload
          })
          .addCase(getObjectAction.rejected, (state, {
            error: {
              message,
            },
          }) => {
            state.object = initObject
            state.status = 'rejected'
            state.error = message
          })
          .addCase(createOrUpdateObjectAction.pending, (state, action) => {
            state.status = 'pending'
          })
          .addCase(createOrUpdateObjectAction.fulfilled, (state, {
            payload,
          }) => {
            state.status = initialState.status
            state.error = null
            state.object = payload
            const existingObject = state.results.find((result) => result.id === payload.id)
            if (existingObject) {
              state.results[existingObject.id] = payload
            } else {
              state.results.push(payload)
              state.totalCount++
            }
          })
          .addCase(createOrUpdateObjectAction.rejected, (state, {
            error: {
              message,
            },
          }) => {
            state.status = 'rejected'
            state.error = message
          })
          .addCase(deleteObjectAction.pending, (state, action) => {
            state.status = 'pending'
          })
          .addCase(deleteObjectAction.fulfilled, (state, {
            payload,
          }) => {
            state.status = 'idle'
            state.error = null
            state.results = state.results.filter((result) => result.id !== payload)
            state.totalCount--
          })
          .addCase(deleteObjectAction.rejected, (state, {
            error: {
              message,
            },
          }) => {
            state.status = 'rejected'
            state.error = message
          })
    },
  })

  const {
    // requestObjects,
    // successReceiveObjects,
    // failedReceiveObjects,
    // requestObject,
    // successReceiveObject,
    // failedReceiveObject,
    successUpdateObject,
    successDeleteObject,
  } = actionsSlice.actions

  return actionsSlice

  // export default actionsSlice.reducer

  // const actions = {}

  // actions.requestObjects = createAction('requestObjects')
  // actions.successReceiveObjects = createAction('successReceiveObjects')
  // actions.failedReceiveObjects = createAction('failedReceiveObjects')

  // actions.requestObject = createAction('requestObject')
  // actions.successReceiveObject = createAction('successReceiveObject')
  // actions.failedReceiveObject = createAction('failedReceiveObject')

  // actions.successUpdateObject = createAction('successUpdateObject')

  // actions.successDeleteObject = createAction('successDeleteObject')

  // return actions
}

// const exclude_from_results = (results, id) =>
//     results.filter(result => (result.id != id))

export const reducerActions = (actions, initObject) => {
  const init_objects_info = {
    results: [],
    totalCount: 0,
    page: null,
    totalPages: 0,
    term: null,
  }

  const reducer_actions = {}

  reducer_actions[actions.requestObjects] = (state) => ({
    ...state,
    ...init_objects_info,
  })

  reducer_actions[actions.successReceiveObjects] = (state, objects_info) => ({
    ...state,
    ...objects_info,
  })

  reducer_actions[actions.failedReceiveObjects] = (state) => ({
    ...state,
    ...init_objects_info,
  })

  reducer_actions[actions.requestObject] = (state) => ({
    ...state,
    object: initObject,
  })

  reducer_actions[actions.successReceiveObject] = (state, object) => ({
    ...state,
    object,
  })

  reducer_actions[actions.failedReceiveObject] = (state) => ({
    ...state,
    object: initObject,
  })

  reducer_actions[actions.successUpdateObject] = (state, object, id) => ({
    ...state,
    object,
    results: [
      ...exclude_from_results(state.results, object.id),
      object,
    ],
    totalCount: state.totalCount + (id ? 0 : 1),
  })

  reducer_actions[actions.successDeleteObject] = (state, id) => ({
    ...state,
    results: exclude_from_results(state.results, id),
    totalCount: state.totalCount - 1,
  })

  return reducer_actions
}

// import config from '../Config'
// import { FORM_ERROR } from 'final-form'

// export class CommonActions {

//     constructor({
//         indexUrl,
//         redirectUrl,
//         initObject = {},
//         to_form_data,
//         preSubmitAction,
//     }) {
//         this.indexUrl = indexUrl
//         this.base_url = `${config.BACKEND}/api${indexUrl}`
//         this.redirectUrl = redirectUrl
//         this.initObject = initObject
//         this.to_form_data = to_form_data
//         this.preSubmitAction = preSubmitAction

//         this.init_objects_info = {
//             results: [],
//             totalCount: 0,
//             page: null,
//             totalPages: 0,
//             term: null
//         }

//         this.initialState = {
//             ...this.init_objects_info,
//             object: this.initObject,
//         }

//         this.reducer_actions = {}
//         this.exclude_from_results = (results, id) =>
//             results.filter(result => (result.id != id))

//         this.requestObjects = createAction('requestObjects')
//         this.successReceiveObjects = createAction('successReceiveObjects')
//         this.failedReceiveObjects = createAction('failedReceiveObjects')

//         this.requestObject = createAction('requestObject')
//         this.successReceiveObject = createAction('successReceiveObject')
//         this.failedReceiveObject = createAction('failedReceiveObject')
//         this.setNewObject = createAction('setNewObject')

//         this.successUpdateObject = createAction('successUpdateObject')

//         this.successDeleteObject = createAction('successDeleteObject')

//         this.reducer_actions[this.requestObjects] = state => ({
//             ...state,
//             ...this.init_objects_info,
//         })

//         this.reducer_actions[this.successReceiveObjects] = (state, objects_info) =>
//             ({
//                 ...state,
//                 ...objects_info,
//             })

//         this.reducer_actions[this.failedReceiveObjects] = state =>
//             ({
//                 ...state,
//                 ...this.init_objects_info,
//             })

//         this.reducer_actions[this.requestObject] = state =>
//             ({
//                 ...state,
//                 object: this.initObject,
//             })

//         this.reducer_actions[this.successReceiveObject] = (state, object) =>
//             ({
//                 ...state,
//                 object,
//             })

//         this.reducer_actions[this.failedReceiveObject] = state =>
//             ({
//                 ...state,
//                 object: this.initObject,
//             })

//         this.reducer_actions[this.setNewObject] = state =>
//             ({
//                 ...state,
//                 object: this.initObject,
//             })

//         this.reducer_actions[this.successUpdateObject] = (state, object, id) =>
//             ({
//                 ...state,
//                 object,
//                 results: [
//                     ...this.exclude_from_results(state.results, object.id),
//                     object
//                 ],
//                 totalCount: state.totalCount + (id ? 0 : 1),
//             })

//         this.reducer_actions[this.successDeleteObject] = (state, id) =>
//             ({
//                 ...state,
//                 results: this.exclude_from_results(state.results, id),
//                 totalCount: state.totalCount - 1,
//             })
//     }

//     getSearchPath = () => this.indexUrl
//     // getReducer = () => this.reducer
//     getReducerActions = () => this.reducer_actions
//     getInitialState = () => this.initialState
// }
