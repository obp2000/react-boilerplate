import {configureStore} from '@reduxjs/toolkit'
import {logger} from 'redux-logger'
import persistState from 'redux-localstorage'
import {apiSlice} from '../services/apiSlice'
import {rtkQueryErrorLogger} from './ErrorMiddleware'
import auth from './auth/authSlice'
import authModal from './auth/modalSlice'

const configureStoreFunc = (preloadedState) => configureStore({
    reducer: {
      auth,
      authModal,
      [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([
      apiSlice.middleware,
      rtkQueryErrorLogger,
      logger]),
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState,
    enhancers: [persistState('auth', {key: 'AUTH'})],
  })

export default configureStoreFunc
