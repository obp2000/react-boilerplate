import type { AuthState, Login, Register, SignOut } from '@/interfaces/auth'
import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import type { AnyAction } from "redux"
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
        })
      .addMatcher(signOut.matchFulfilled, () => initialState)
      .addMatcher(register.matchFulfilled,
        (state, { payload }: PayloadAction<Register>) => {
          state.isAuthenticated = true
          state.accessToken = payload.key
        })
    // .addMatcher(register.matchRejected, (_, { payload }: AnyAction) => {
    //   const message = Object.values(payload.data).join('\n\n')
    //   toastError(message)
    // })
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
