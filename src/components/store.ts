import { configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'
import type { MakeStore } from 'next-redux-wrapper'
import {
  nextReduxCookieMiddleware,
  wrapMakeStore,
} from 'next-redux-cookie-wrapper'
// import {logger} from 'redux-logger'
// import logger from './logger'
import { apiSlice } from '../services/apiSlice'
import { rtkQueryErrorLogger } from './errorMiddleware'
import auth from './auth/authSlice'
import authModal from './auth/modalSlice'

export const store = configureStore({
  reducer: {
    auth,
    authModal,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().
    prepend(
      nextReduxCookieMiddleware({ subtrees: ['auth'] })
    ).
    concat([
      apiSlice.middleware,
      rtkQueryErrorLogger,
      // logger,
    ]
    ),
  devTools: process.env.NODE_ENV !== 'production',
})

export const makeStore: MakeStore<typeof store> = () => store

export const wrappedMakeStore = wrapMakeStore(makeStore)

// export const wrapper = createWrapper(wrappedMakeStore, { debug: false })
export const wrapper = createWrapper(wrappedMakeStore, { debug: false })

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState,
// users: UsersState}
export type AppDispatch = typeof store.dispatch
