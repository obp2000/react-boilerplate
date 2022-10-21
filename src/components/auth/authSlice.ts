import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import { AnyAction } from "redux"
import type {
  AuthState, Login,
  Register,
  SignOut
} from '../../../interfaces/auth'
import { toastError, toastSuccess } from '../notifications/toast'
import { login, register, signOut } from './authApi'

const initialState: AuthState = {
  isAuthenticated: false,
  accessToken: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(HYDRATE, (state, { payload }: AnyAction) => ({
        ...state,
        ...payload.auth,
      }))
      .addMatcher(login.matchFulfilled,
        (state, { payload }: PayloadAction<Login>) => {
          state.isAuthenticated = true
          state.accessToken = payload.key
          toastSuccess(payload.message)
        })
      .addMatcher(login.matchRejected,
        (_, { payload }: AnyAction) => {
          toastError(payload.data.non_field_errors[0])
        })
      .addMatcher(signOut.matchFulfilled,
        (_, { payload }: PayloadAction<SignOut>) => {
          toastSuccess(payload.detail)
          return initialState
        })
      .addMatcher(register.matchFulfilled,
        (state, { payload }: PayloadAction<Register>) => {
          state.isAuthenticated = true
          state.accessToken = payload.key
          toastSuccess(payload.message)
        })
      .addMatcher(register.matchRejected, (_, { payload }: AnyAction) => {
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
