import {createSlice, createAsyncThunk, createSelector} from '@reduxjs/toolkit'
import {api} from '../Config'
import {selectAuth} from './auth'

// export const getOptionsThunk = indexUrl => createAsyncThunk(
//     'getOptions',
//     async (_, { getState }) => {
//         const {
//             data: {
//                 actions
//             }
//         } = await api.options(
//             indexUrl, {
//                 params: {
//                     isAuthenticated: selectAuth(getState()).isAuthenticated
//                 }
//             }
//         )
//         return actions
//     }
// )

const initialState = {
  status: 'idle',
  error: null,
}

// const getOptionsAction = getOptionsThunk()

export const commonConstsSlice = createSlice({
  name: 'commonConsts',
  initialState,
  reducers: {
    receiveCommonConsts: (state, {payload}) => payload,
  },
  extraReducers(builder) {
    builder
        .addCase(getOptionsAction.pending, (state, action) => {
          state.status = 'pending'
        })
        .addCase(getOptionsAction.fulfilled, (state, {payload}) => {
          const {
            commonConsts,
            ...options
          } = payload.POST || payload.PUT
          return {
            ...commonConsts,
            options,
            status: 'idle',
            error: null,
          }
        })
        .addCase(getOptionsAction.rejected, (state, {error}) => {
          state.status = 'rejected'
          state.error = error.message
        })
  },
})

// export const {
//     receiveCommonConsts
// } = commonConstsSlice.actions

export default commonConstsSlice.reducer

export const selectCommonConsts = ({
  commonConsts,
}) => commonConsts

export const selectOptions = createSelector(
    [selectCommonConsts],
    ({options = {}}) => options,
)

export const selectErrorMessages = createSelector(
    [selectCommonConsts],
    ({error_messages = {}}) => error_messages,
)

export const selectMainMenu = createSelector(
    [selectCommonConsts],
    ({main_menu = []}) => main_menu,
)

export const selectConsts = createSelector(
    [selectOptions],
    ({Consts = {}}) => Consts,
)

// import { createAction, createReducer } from 'redux-act'

// const reducer_actions = {}

// export const receiveCommonConsts = createAction('receiveCommonConsts')

// const initialState = {}

// reducer_actions[receiveCommonConsts] = (state, consts) =>
//     ({
//         ...state,
//         ...consts
//     })

// const commonConsts = createReducer(reducer_actions, initialState)
