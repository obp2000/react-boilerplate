import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import { AnyAction } from "redux"
import { toastSuccess, toastError } from '../Shared/toast'
import { login, register, signOut } from './authApi'
import type { Login, Register, SignOut, } from '../../../interfaces/auth'
// import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query'
// import type {RootState} from '../store'

interface AuthState {
  isAuthenticated: boolean
  accessToken: string | null
}

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
