import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'
import { api } from '../Config'
import { selectAuth } from './auth'

export const getOptionsThunk = index_url => createAsyncThunk(
    'getOptions',
    async (_, { getState }) => {
        const {
            data: {
                actions
            }
        } = await api.options(
            index_url, {
                params: {
                    isAuthenticated: selectAuth(getState()).isAuthenticated
                }
            }
        )
        return actions
    }
)

const initialState = {
    status: 'idle',
    error: null
}

const getOptionsAction = getOptionsThunk()

export const commonConstsSlice = createSlice({
    name: 'common_consts',
    initialState,
    reducers: {
        receiveCommonConsts: (state, { payload }) => payload
    },
    extraReducers(builder) {
        builder
            .addCase(getOptionsAction.pending, (state, action) => {
                state.status = 'pending'
            })
            .addCase(getOptionsAction.fulfilled, (state, { payload }) => {
                const {
                    common_consts,
                    ...options
                } = payload.POST || payload.PUT
                return { ...common_consts,
                    options,
                    status: 'idle',
                    error: null
                }
            })
            .addCase(getOptionsAction.rejected, (state, { error }) => {
                state.status = 'rejected'
                state.error = error.message
            })
    }
})

export const {
    receiveCommonConsts
} = commonConstsSlice.actions

export default commonConstsSlice.reducer

export const selectCommonConsts = ({
    common_consts
}) => common_consts

export const selectOptions = createSelector([selectCommonConsts],
    ({ options = {} }) => options)

export const selectErrorMessages = createSelector([selectCommonConsts],
    ({ error_messages = {} }) => error_messages)

export const selectMainMenu = createSelector([selectCommonConsts],
    ({ main_menu = [] }) => main_menu)

export const selectConsts = createSelector([selectOptions],
    ({ Consts = {} }) => Consts)

// import { createAction, createReducer } from 'redux-act'

// const reducer_actions = {}

// export const receiveCommonConsts = createAction('receiveCommonConsts')

// const initialState = {}

// reducer_actions[receiveCommonConsts] = (state, consts) =>
//     ({
//         ...state,
//         ...consts
//     })

// const common_consts = createReducer(reducer_actions, initialState)
