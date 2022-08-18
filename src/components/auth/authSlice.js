import {createSlice} from '@reduxjs/toolkit'
import {HYDRATE} from 'next-redux-wrapper'
import {toastSuccess, toastError} from '../Shared/Toast'
import {login, register, signOut} from './authApi'

const emptyObject = {}

const initialState = {
  isAuthenticated: false,
  accessToken: null,
}

// const persistedState = getCookieStore('auth', initialState)

const setAuthenticated = (state, {payload}) => {
  state.isAuthenticated = true
  state.accessToken = payload.key
  toastSuccess(payload.message)
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: (builder) => {
    builder
        .addCase(HYDRATE, (state, {payload}) => ({
          ...state,
          ...payload.auth,
        }))
        .addMatcher(login.matchFulfilled, setAuthenticated)
        .addMatcher(login.matchRejected, (state, {payload}) => {
          toastError(payload.data.non_field_errors[0])
        })
        .addMatcher(signOut.matchFulfilled, (state, {payload}) => {
          toastSuccess(payload.detail)
          return initialState
        })
        .addMatcher(register.matchFulfilled, setAuthenticated)
        .addMatcher(register.matchRejected, (state, {payload}) => {
          const message = Object.values(payload.data).join('\n\n')
          toastError(message)
        })
    // .addMatcher(getUser.matchFulfilled,
    //     (state, {payload}) => {
    //       state.user = payload
    //     }
    // )
    // .addMatcher(apiSlice.endpoints.getOptions.matchFulfilled,
    //     (state, {payload}) => {
    //       state.lastOptionsArg = payload.arg
    //     })
  },
})

export default authSlice.reducer
