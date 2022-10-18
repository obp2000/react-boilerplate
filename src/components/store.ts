import { configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'
import {
  nextReduxCookieMiddleware,
  wrapMakeStore,
} from 'next-redux-cookie-wrapper'
import logger from './logger'
import { apiSlice } from '../services/apiSlice'
import { rtkQueryErrorLogger } from './errorMiddleware'
import auth from './auth/authSlice'
import authModal from './auth/modalSlice'

const makeStore = () => configureStore({
    reducer: {
      auth,
      authModal,
      [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().
      prepend(
        nextReduxCookieMiddleware({ subtrees: ['auth'] }),
        apiSlice.middleware,
      ).
      concat([
        rtkQueryErrorLogger,
        logger,
      ]
      ),
    devTools: process.env.NODE_ENV !== 'production',
  })

export const wrappedMakeStore = wrapMakeStore(makeStore)
export const wrapper = createWrapper(wrappedMakeStore, { debug: false })

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']


// import type { Action, ThunkAction } from '@reduxjs/toolkit'
// export type AppThunk<ReturnType = void> =
//   ThunkAction<ReturnType, RootState, unknown, Action>

// export const store = configureStore({
//   reducer: {
//     auth,
//     authModal,
//     [apiSlice.reducerPath]: apiSlice.reducer,
//   },
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware().
//     prepend(
//       nextReduxCookieMiddleware({ subtrees: ['auth'] })
//     ).
//     concat([
//       apiSlice.middleware,
//       rtkQueryErrorLogger,
//       logger,
//     ]
//     ),
//   devTools: process.env.NODE_ENV !== 'production',
// })

// export const makeStore: MakeStore<typeof store> = () => store
