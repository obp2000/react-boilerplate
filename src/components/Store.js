import {logger} from 'redux-logger'
import {configureStore} from '@reduxjs/toolkit'
import persistState from 'redux-localstorage'
import {apiSlice} from '../services/apiSlice'
import {rtkQueryErrorLogger} from './ErrorMiddleware'
import auth from './redux/auth'

export const configureStoreFunc = (preloadedState) => {
  const store = configureStore({
    reducer: {
      auth,
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

  // if (process.env.NODE_ENV !== 'production' && module.hot) {
  //     module.hot.accept('./redux/index', () => store.replaceReducer(reducer))
  // }

  return store
}

export default configureStoreFunc
